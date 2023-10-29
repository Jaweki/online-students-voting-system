"use client";
import {
  AdjustGuideContext,
  AdjustRulesContext,
  LandingPageContext,
  ManageUsersContext,
  NewBallotContext,
} from "@/components/AdminCPContext";
import UserNavBar from "@/components/UserNavBar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showNewBallot, setShowNewBallot] = useState(false);
  const [showAdjustRules, setShowAdjustRules] = useState(false);
  const [showAdjustGuide, setShowAdjustGuide] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  return (
    <main className="">
      <LandingPageContext.Provider value={showLandingPage}>
        <ManageUsersContext.Provider value={showManageUsers}>
          <AdjustGuideContext.Provider value={showAdjustGuide}>
            <AdjustRulesContext.Provider value={showAdjustRules}>
              <NewBallotContext.Provider value={showNewBallot}>
                <UserNavBar
                  setShowNewBallot={setShowNewBallot}
                  setShowLandingPage={setShowLandingPage}
                />
                {children}
              </NewBallotContext.Provider>
            </AdjustRulesContext.Provider>
          </AdjustGuideContext.Provider>
        </ManageUsersContext.Provider>
      </LandingPageContext.Provider>
    </main>
  );
}
