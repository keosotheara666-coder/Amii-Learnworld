import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoute, Navbar } from './components/Navbar';
import { ExploreMegaMenu } from './components/ExploreMegaMenu';
import { AuthModal } from './components/AuthModal';
import { AppModal } from './components/AppModal';
import { SupportDrawer } from './components/SupportDrawer';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExploreBranchesPage } from './pages/ExploreBranchesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CareerHubPage } from './pages/CareerHubPage';
import { BusinessPremiumPage } from './pages/BusinessPremiumPage';
import { DashboardPage } from './pages/DashboardPage';
import { StoriesAboutPage } from './pages/StoriesAboutPage';
import { COURSES, MAJORS } from './data/catalog';

function AppShell() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [exploreOpen, setExploreOpen] = useState(false);
  const [selectedMajorId, setSelectedMajorId] = useState<string>(MAJORS[0].id);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [selectedInstituteId, setSelectedInstituteId] = useState<string | undefined>(undefined);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  const navigateTo = (route: AppRoute) => {
    setExploreOpen(false);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBranch = (
    majorId: string,
    countryFilter?: string,
    instituteId?: string
  ) => {
    setExploreOpen(false);
    setSelectedMajorId(majorId);
    setSelectedCountry(countryFilter);
    setSelectedInstituteId(instituteId);
    setCurrentRoute('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCourse = (courseId: string) => {
    setExploreOpen(false);
    setSelectedCourseId(courseId);
    setCurrentRoute('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        currentRoute={currentRoute}
        exploreOpen={exploreOpen}
        onToggleExplore={() => setExploreOpen((prev) => !prev)}
        onNavigate={navigateTo}
        onOpenAppModal={() => setAppModalOpen(true)}
        showPromo={showPromo}
        onDismissPromo={() => setShowPromo(false)}
      />

      <ExploreMegaMenu
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onNavigateBranch={navigateToBranch}
        onNavigateCourse={navigateToCourse}
      />

      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onNavigateBranch={navigateToBranch}
            onNavigateCourse={navigateToCourse}
            onOpenAppModal={() => setAppModalOpen(true)}
          />
        )}

        {currentRoute === 'explore' && (
          <ExploreBranchesPage
            selectedMajorId={selectedMajorId}
            selectedCountry={selectedCountry}
            selectedInstituteId={selectedInstituteId}
            onSelectBranch={navigateToBranch}
            onNavigateCourse={navigateToCourse}
          />
        )}

        {currentRoute === 'course' && (
          <CourseDetailPage
            courseId={selectedCourseId}
            onBack={() => navigateTo('explore')}
            onNavigateBranch={navigateToBranch}
            onNavigateCourse={navigateToCourse}
          />
        )}

        {currentRoute === 'career' && <CareerHubPage onNavigateBranch={navigateToBranch} />}

        {(currentRoute === 'business' || currentRoute === 'premium') && (
          <BusinessPremiumPage
            mode={currentRoute === 'premium' ? 'premium' : 'business'}
            onSwitchMode={(m) => navigateTo(m)}
          />
        )}

        {currentRoute === 'dashboard' && (
          <DashboardPage
            onNavigateCourse={navigateToCourse}
            onNavigateBranch={navigateToBranch}
          />
        )}

        {(currentRoute === 'stories' || currentRoute === 'about') && (
          <StoriesAboutPage
            mode={currentRoute === 'stories' ? 'stories' : 'about'}
            onNavigateBranch={navigateToBranch}
          />
        )}
      </main>

      <Footer
        onNavigate={navigateTo}
        onNavigateBranch={navigateToBranch}
        onOpenAppModal={() => setAppModalOpen(true)}
      />

      <AuthModal />
      <AppModal isOpen={appModalOpen} onClose={() => setAppModalOpen(false)} />
      <SupportDrawer
        onNavigateBranch={navigateToBranch}
        onNavigateCourse={navigateToCourse}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
