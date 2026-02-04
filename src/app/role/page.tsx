"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { ArrowRight, Briefcase, Code2, Palette, Sparkles, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TECH_ROLES, NON_TECH_ROLES, getSkillsForRole } from "@/lib/dummyData";

type RoleCategory = "tech" | "non-tech" | null;
type SkillChip = { id: string; label: string };

function toChip(label: string): SkillChip {
  return { id: label.toLowerCase().replace(/\s+/g, "-"), label };
}

function getInitialCategory(role: string | undefined): RoleCategory {
  if (!role) return null;
  if (TECH_ROLES.includes(role)) return "tech";
  if (NON_TECH_ROLES.includes(role)) return "non-tech";
  return null;
}

export default function RolePage() {
  const router = useRouter();
  const { state, updateState } = useFlow();

  const [roleCategory, setRoleCategory] = useState<RoleCategory>(
    getInitialCategory(state.role),
  );
  const [selectedRole, setSelectedRole] = useState(state.role ?? "");
  const [headcount, setHeadcount] = useState(state.headcount ?? "");
  const [experienceRange, setExperienceRange] = useState(
    state.experienceRange ?? "3-5 years",
  );
  const [customSkill, setCustomSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SkillChip[]>(
    (state.skills ?? []).length > 0
      ? (state.skills ?? []).map((s) => toChip(s))
      : [],
  );

  const rolesForCategory =
    roleCategory === "tech"
      ? TECH_ROLES
      : roleCategory === "non-tech"
        ? NON_TECH_ROLES
        : [];

  const roleSkills = useMemo(
    () => getSkillsForRole(selectedRole).map(toChip),
    [selectedRole],
  );

  const skillsToShow = selectedRole ? roleSkills : [];

  function selectCategory(cat: RoleCategory) {
    setRoleCategory(cat);
    setSelectedRole("");
    setSelectedSkills([]);
  }

  function selectRole(role: string) {
    setSelectedRole(role);
    setSelectedSkills([]);
  }

  function toggleSkill(skill: SkillChip) {
    setSelectedSkills((current) => {
      const exists = current.some((s) => s.id === skill.id);
      if (exists) return current.filter((s) => s.id !== skill.id);
      return [...current, skill];
    });
  }

  function removeSkill(skill: SkillChip) {
    setSelectedSkills((current) => current.filter((s) => s.id !== skill.id));
  }

  function addCustomSkill() {
    const trimmed = customSkill.trim();
    if (!trimmed) return;
    const chip = toChip(trimmed);
    setSelectedSkills((current) => {
      if (current.some((s) => s.id === chip.id)) return current;
      return [...current, chip];
    });
    setCustomSkill("");
  }

  function applyAllRoleSkills() {
    setSelectedSkills(skillsToShow);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateState({
      role: selectedRole || undefined,
      headcount: headcount.trim() || undefined,
      experienceRange: experienceRange || undefined,
      skills:
        selectedSkills.length > 0
          ? selectedSkills.map((s) => s.label)
          : undefined,
    });
    router.push("/preferences");
  }

  return (
    <div className="space-y-10">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <Briefcase className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            What role are you hiring for?
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {roleCategory === null
              ? "First choose whether you need a Tech or Non-Tech role. Then we’ll show you roles and suggest skills."
              : "Select a role below. We’ll suggest skills that strictly match this role."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Tech vs Non-Tech */}
        <Card>
          <label className="mb-4 block text-sm font-semibold text-stone-700">
            Choose category
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => selectCategory("tech")}
              className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                roleCategory === "tech"
                  ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                  : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  roleCategory === "tech" ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-600"
                }`}
              >
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-base font-semibold text-stone-900">Tech</span>
                <span className="text-sm text-stone-500">Software, engineering, QA, DevOps, AI/ML</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => selectCategory("non-tech")}
              className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                roleCategory === "non-tech"
                  ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                  : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  roleCategory === "non-tech" ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-600"
                }`}
              >
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-base font-semibold text-stone-900">Non-Tech</span>
                <span className="text-sm text-stone-500">Product, design, marketing, HR, sales, operations</span>
              </div>
            </button>
          </div>
          {roleCategory && (
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className="mt-3 text-xs font-medium text-stone-500 underline hover:text-orange-600"
            >
              Change category
            </button>
          )}
        </Card>

        {/* Step 2: Specific role (only after category is chosen) */}
        {roleCategory && (
          <Card>
            <label className="mb-4 block text-sm font-semibold text-stone-700">
              Select role
            </label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {rolesForCategory.map((role) => {
                const isActive = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => selectRole(role)}
                    className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left transition-all ${
                      isActive
                        ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                        : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <span className="break-words text-sm font-semibold text-stone-900">{role}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              How many candidates are you looking for?
            </label>
            <input
              className="w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
              placeholder="E.g. 2–5"
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Experience level
            </label>
            <select
              className="w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-4 py-3 text-stone-900 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
              value={experienceRange}
              onChange={(e) => setExperienceRange(e.target.value)}
            >
              <option value="0-2 years">0–2 years</option>
              <option value="2-4 years">2–4 years</option>
              <option value="3-5 years">3–5 years</option>
              <option value="5-8 years">5–8 years</option>
              <option value="8+ years">8+ years</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        {selectedRole && skillsToShow.length > 0 && (
          <Card accent className="rounded-2xl border-l-4 border-l-orange-500 bg-orange-50/30 p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                <Sparkles className="h-5 w-5 text-orange-600" />
                Skills for {selectedRole}
              </span>
              <button
                type="button"
                onClick={applyAllRoleSkills}
                className="text-xs font-medium text-orange-600 underline hover:text-orange-700"
              >
                Select all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsToShow.map((skill) => {
                const isSelected = selectedSkills.some((s) => s.id === skill.id);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`inline-flex items-center rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500 text-white shadow-md"
                        : "border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {skill.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input
                className="min-w-0 flex-1 rounded-xl border-2 border-stone-200 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-500/15"
                placeholder="Add a skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustomSkill())
                }
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="rounded-xl border-2 border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:border-orange-200 hover:bg-orange-50"
              >
                Add
              </button>
            </div>
            {selectedSkills.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-stone-500">Selected:</span>
                {selectedSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm"
                  >
                    {skill.label}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="rounded p-0.5 hover:bg-stone-100"
                      aria-label={`Remove ${skill.label}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Card>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!roleCategory || !selectedRole}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
