import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, ThumbsUp, Users } from 'lucide-react';
import { Course, INSTITUTES, MAJORS } from '../data/catalog';
import { CourseEnrollment } from '../lib/firestoreHelpers';

interface CourseCardProps {
  course: Course;
  enrollment?: CourseEnrollment;
  onMoreInfo: (courseId: string) => void;
  onStartLearning: (courseId: string) => void;
  onSelectMajor?: (majorId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  enrollment,
  onMoreInfo,
  onStartLearning,
  onSelectMajor,
}) => {
  const [imgError, setImgError] = useState(false);
  const institute = INSTITUTES.find((i) => i.id === course.instituteId);
  const major = MAJORS.find((m) => m.id === course.majorId);

  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
        {!imgError ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-200 flex flex-col items-center justify-center p-4 text-center">
            <BookOpen className="w-7 h-7 text-emerald-700 mb-1.5" />
            <span className="text-xs font-medium text-slate-600 line-clamp-2">{course.title}</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Unboxed 1-line metadata kicker (zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5 truncate">
          <span className="text-emerald-700 font-semibold">{course.credentialType}</span>
          <span aria-hidden="true">·</span>
          <span>{course.level}</span>
          <span aria-hidden="true">·</span>
          <span>{course.languages.join(', ')}</span>
        </div>

        <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2 line-clamp-2 min-h-[42px]">
          {course.title}
        </h3>

        {institute && (
          <p className="text-xs text-slate-600 mb-2 truncate">
            {institute.name} ({institute.country})
          </p>
        )}

        {major && onSelectMajor && (
          <button
            type="button"
            onClick={() => onSelectMajor(major.id)}
            className="text-left text-xs text-sky-700 hover:text-sky-800 hover:underline font-medium mb-3 truncate"
          >
            Major Branch: {major.shortName}
          </button>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 tabular-nums mb-3">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {course.durationHours}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            {course.learnersCount.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
            {course.likesCount.toLocaleString()}
          </span>
        </div>

        {enrollment && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1 tabular-nums">
              <span>{enrollment.certificateEarned ? 'Certified' : 'In Progress'}</span>
              <span>{enrollment.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#378652] transition-all duration-300"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMoreInfo(course.id)}
            className="flex-1 py-2 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            More Info
          </button>
          <button
            type="button"
            onClick={() => onStartLearning(course.id)}
            className="flex-[1.3] py-2 px-3 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{enrollment ? 'Continue' : 'Start Learning'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
