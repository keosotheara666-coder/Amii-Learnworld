import { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  Unsubscribe,
} from 'firebase/firestore';
import { auth, db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface UserProfile {
  uid: string;
  displayName: string;
  country: string;
  targetMajor: string;
  plan: 'free' | 'premium';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CourseEnrollment {
  userId: string;
  courseId: string;
  majorId: string;
  instituteId: string;
  progress: number;
  completedModules: string[];
  quizScore?: number;
  certificateEarned: boolean;
  enrolledAt?: unknown;
  updatedAt?: unknown;
}

export interface UserResume {
  userId: string;
  fullName: string;
  headline: string;
  summary: string;
  targetMajor: string;
  skills: string[];
  updatedAt?: unknown;
}

export async function ensureUserProfile(
  user: User,
  defaults?: { displayName?: string; country?: string; targetMajor?: string }
): Promise<UserProfile> {
  const userPath = `users/${user.uid}`;
  const privatePath = `users/${user.uid}/private/account`;
  const userRef = doc(db, 'users', user.uid);
  const privateRef = doc(db, 'users', user.uid, 'private', 'account');

  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const existingData = snap.data() as UserProfile;
      if (defaults?.country || defaults?.targetMajor || defaults?.displayName) {
        const nextDisplay = (defaults.displayName || existingData.displayName || 'Learner').slice(0, 100);
        const nextCountry = (defaults.country || existingData.country || 'United States').slice(0, 80);
        const nextMajor = (defaults.targetMajor || existingData.targetMajor || 'computer-science-it').slice(0, 80);
        await updateDoc(userRef, {
          displayName: nextDisplay,
          country: nextCountry,
          targetMajor: nextMajor,
          updatedAt: serverTimestamp(),
        });
        return {
          ...existingData,
          displayName: nextDisplay,
          country: nextCountry,
          targetMajor: nextMajor,
        };
      }
      return existingData;
    }

    const displayName = (defaults?.displayName || user.displayName || 'AMii Learner').slice(0, 100);
    const country = (defaults?.country || 'United States').slice(0, 80);
    const targetMajor = (defaults?.targetMajor || 'computer-science-it').slice(0, 80);
    const email = (user.email || 'learner@amii.edu').slice(0, 200);

    const batch = writeBatch(db);
    batch.set(userRef, {
      uid: user.uid,
      displayName,
      country,
      targetMajor,
      plan: 'free',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    batch.set(privateRef, {
      uid: user.uid,
      email,
      updatedAt: serverTimestamp(),
    });
    await batch.commit();

    return {
      uid: user.uid,
      displayName,
      country,
      targetMajor,
      plan: 'free',
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${userPath} / ${privatePath}`);
  }
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<Pick<UserProfile, 'displayName' | 'country' | 'targetMajor' | 'plan'>>
): Promise<void> {
  const userPath = `users/${uid}`;
  const userRef = doc(db, 'users', uid);
  try {
    const payload: Record<string, unknown> = { updatedAt: serverTimestamp() };
    if (updates.displayName !== undefined) payload.displayName = updates.displayName.slice(0, 100);
    if (updates.country !== undefined) payload.country = updates.country.slice(0, 80);
    if (updates.targetMajor !== undefined) payload.targetMajor = updates.targetMajor.slice(0, 80);
    if (updates.plan !== undefined) payload.plan = updates.plan;
    await updateDoc(userRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userPath);
  }
}

export function subscribeToEnrollments(
  uid: string,
  onUpdate: (enrollments: Record<string, CourseEnrollment>) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const path = `users/${uid}/enrollments`;
  const q = query(collection(db, 'users', uid, 'enrollments'), where('userId', '==', uid));
  return onSnapshot(
    q,
    (snapshot) => {
      const map: Record<string, CourseEnrollment> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as CourseEnrollment;
        map[data.courseId] = data;
      });
      onUpdate(map);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (formattedErr) {
        if (onError && formattedErr instanceof Error) onError(formattedErr);
      }
    }
  );
}

export async function enrollInCourse(
  uid: string,
  courseId: string,
  majorId: string,
  instituteId: string
): Promise<void> {
  const path = `users/${uid}/enrollments/${courseId}`;
  const ref = doc(db, 'users', uid, 'enrollments', courseId);
  try {
    const existingSnap = await getDoc(ref);
    if (existingSnap.exists()) return;
    await setDoc(ref, {
      userId: uid,
      courseId,
      majorId: majorId.slice(0, 80),
      instituteId: instituteId.slice(0, 80),
      progress: 0,
      completedModules: [],
      certificateEarned: false,
      enrolledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateCourseProgress(
  uid: string,
  courseId: string,
  completedModules: string[],
  progress: number,
  quizScore?: number,
  certificateEarned?: boolean
): Promise<void> {
  const path = `users/${uid}/enrollments/${courseId}`;
  const ref = doc(db, 'users', uid, 'enrollments', courseId);
  try {
    const payload: Record<string, unknown> = {
      completedModules: completedModules.slice(0, 30),
      progress: Math.max(0, Math.min(100, Math.round(progress))),
      updatedAt: serverTimestamp(),
    };
    if (quizScore !== undefined) {
      payload.quizScore = Math.max(0, Math.min(100, Math.round(quizScore)));
    }
    if (certificateEarned !== undefined) {
      payload.certificateEarned = certificateEarned;
    }
    await updateDoc(ref, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function getSavedResume(uid: string): Promise<UserResume | null> {
  const path = `users/${uid}/resumes/main`;
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'resumes', 'main'));
    return snap.exists() ? (snap.data() as UserResume) : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveUserResume(
  uid: string,
  resume: Omit<UserResume, 'userId' | 'updatedAt'>
): Promise<void> {
  const path = `users/${uid}/resumes/main`;
  const ref = doc(db, 'users', uid, 'resumes', 'main');
  try {
    const snap = await getDoc(ref);
    const payload = {
      userId: uid,
      fullName: resume.fullName.slice(0, 120),
      headline: resume.headline.slice(0, 160),
      summary: resume.summary.slice(0, 2000),
      targetMajor: resume.targetMajor.slice(0, 80),
      skills: resume.skills.slice(0, 20),
      updatedAt: serverTimestamp(),
    };
    if (snap.exists()) {
      await updateDoc(ref, {
        fullName: payload.fullName,
        headline: payload.headline,
        summary: payload.summary,
        targetMajor: payload.targetMajor,
        skills: payload.skills,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, payload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function submitBusinessInquiry(
  uid: string,
  data: { companyName: string; teamSize: string; majorFocus: string; notes?: string }
): Promise<string> {
  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const path = `businessInquiries/${inquiryId}`;
  try {
    const payload: Record<string, unknown> = {
      userId: uid,
      companyName: data.companyName.slice(0, 120),
      teamSize: data.teamSize.slice(0, 40),
      majorFocus: data.majorFocus.slice(0, 80),
      createdAt: serverTimestamp(),
    };
    if (data.notes && data.notes.trim().length > 0) {
      payload.notes = data.notes.trim().slice(0, 1000);
    }
    await setDoc(doc(db, 'businessInquiries', inquiryId), payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
