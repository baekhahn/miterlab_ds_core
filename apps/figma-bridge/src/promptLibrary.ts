import fs from "node:fs";
import path from "node:path";
import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";
import { createButtonInspectionPrompt } from "../../../packages/figma-generator/src/examples/buttonFamily/createButtonInspectionPrompt";
import { createInputInspectionPrompt } from "../../../packages/figma-generator/src/examples/inputFamily/createInputInspectionPrompt";

const promptExamplesDir = path.resolve(
  process.cwd(),
  "packages/figma-generator/src/examples/prompts"
);

const catalogPrompt: DesignPrompt = {
  screen: "catalog",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "form", "filter", "list", "modal", "action"],
  primaryAction: "Primary button",
  secondaryAction: "Secondary button",
  components: [
    { type: "text", intent: "title", label: "Core Component Catalog" },
    { type: "text", intent: "subtitle", label: "Backbone validation surface for core sizing, spacing, and alignment." },
    { type: "text", section: "content", intent: "subtitle", label: "Navigation, tags, badges, and neutral surfaces" },
    { type: "tabs", section: "content", label: "Tabs / Line / md", variant: "line", size: "md" },
    { type: "tabs", section: "content", label: "Tabs / Pills / sm", variant: "pills", size: "sm" },
    { type: "tag", section: "content", label: "Tag / Default", variant: "default", size: "md" },
    { type: "badge", section: "content", label: "Badge / Success", variant: "success", size: "sm" },
    { type: "divider", section: "content", label: "Divider", variant: "default", size: "sm" },
    { type: "card", section: "content", label: "Card / Raised", variant: "raised", size: "md" },
    { type: "container", section: "content", label: "Container / Neutral", variant: "default", size: "md" },
    { type: "text", section: "form", intent: "subtitle", label: "Fields, labels, and selection controls" },
    { type: "label", section: "form", label: "Field label", size: "md" },
    { type: "form-field", section: "form", label: "Form field", size: "md" },
    { type: "input", section: "form", intent: "text-input", label: "Input / Text", size: "md" },
    { type: "textarea", section: "form", label: "Textarea / Default", size: "md" },
    { type: "select", section: "form", label: "Select / Default", size: "md" },
    { type: "checkbox", section: "form", label: "Checkbox / Checked", variant: "checked", size: "md" },
    { type: "radio", section: "form", label: "Radio / Checked", variant: "checked", size: "md" },
    { type: "switch", section: "form", label: "Switch / On", variant: "on", size: "md" },
    { type: "text", section: "filter", intent: "subtitle", label: "Filters and compact toolbars" },
    { type: "filter-button", section: "filter", label: "Filter / Selected", selected: true, size: "sm" },
    { type: "filter-button", section: "filter", label: "Filter / Default", selected: false, size: "sm" },
    { type: "toolbar", section: "filter", label: "Toolbar / Actions", size: "md" },
    { type: "text", section: "list", intent: "subtitle", label: "Data display and empty feedback" },
    { type: "table", section: "list", label: "Table / Default", size: "md" },
    { type: "list-row", section: "list", label: "ListRow / Default", size: "md" },
    { type: "empty-state", section: "list", label: "EmptyState / Default", size: "md" },
    { type: "text", section: "modal", intent: "subtitle", label: "Overlays and focused task surfaces" },
    { type: "modal", section: "modal", label: "Modal / Medium", size: "md" },
    { type: "dialog", section: "modal", label: "Dialog / Default", size: "md" },
    { type: "text", section: "action", intent: "subtitle", label: "Primary actions and feedback messages" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", label: "Button / Primary", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "neutral", label: "Button / Secondary", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "ghost", label: "Button / Ghost", size: "sm" },
    { type: "alert", section: "action", label: "Alert / Warning", variant: "warning", size: "md" },
    { type: "toast", section: "action", label: "Toast / Info", variant: "info", size: "md" }
  ]
};

const playgroundPrompt: DesignPrompt = {
  screen: "playground",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "form", "filter", "list", "action"],
  primaryAction: "Primary button",
  secondaryAction: "Secondary button",
  components: [
    { type: "text", intent: "title", label: "Core Playground" },
    { type: "text", intent: "subtitle", label: "Inspect component rhythm, alignment, and spacing in one surface." },
    { type: "text", section: "content", name: "Title sample", label: "Title - Product page heading" },
    { type: "text", section: "content", intent: "subtitle", name: "Subtitle sample", label: "Subtitle - Section lead copy" },
    { type: "text", section: "content", name: "Body sample", label: "Body - Default text rhythm used in forms and lists." },
    { type: "text", section: "content", name: "Caption sample", label: "Caption - Compact supporting copy for metadata." },
    { type: "input", section: "form", intent: "text-input", name: "Input text", label: "Text field", size: "md" },
    { type: "input", section: "form", intent: "password-input", name: "Input password", label: "Password field", size: "md" },
    { type: "text", section: "form", intent: "helper-text", label: "Field spacing and text inset should feel balanced." },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip open", label: "Open", selected: true, size: "sm" },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip closed", label: "Closed", selected: false, size: "sm" },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip review", label: "In Review", selected: false, size: "md" },
    { type: "text", section: "list", name: "List title", label: "List row - Item title" },
    { type: "text", section: "list", name: "List meta", label: "List row meta - Supporting information and spacing check" },
    { type: "button", section: "list", intent: "secondary-action", variant: "neutral", name: "Row action", label: "View item", size: "sm" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", name: "Primary button", label: "Primary button", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "neutral", name: "Secondary button", label: "Secondary button", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "ghost", name: "Ghost button", label: "Ghost button", size: "sm" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", name: "Large button", label: "Large button", size: "lg" }
  ]
};

const loginPrompt: DesignPrompt = {
  screen: "login",
  theme: "core",
  density: "comfortable",
  sections: ["header", "form", "action", "footer"],
  primaryAction: "Sign in",
  components: [
    { type: "text", intent: "title", label: "Sign in" },
    { type: "text", intent: "subtitle", label: "Enter your account details." },
    {
      type: "input",
      intent: "text-input",
      name: "Email Input",
      label: "Email",
      placeholder: "Enter your email",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "input",
      intent: "text-input",
      name: "Password Input",
      label: "Password",
      placeholder: "Enter your password",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "button",
      intent: "primary-action",
      label: "Sign in",
      variant: "primary",
      size: "md",
      width: "full",
      fullWidth: true,
      block: true
    }
  ]
};

const signupPrompt: DesignPrompt = {
  screen: "signup",
  theme: "core",
  density: "comfortable",
  sections: ["header", "form", "action", "footer"],
  primaryAction: "회원가입",
  components: [
    { type: "text", intent: "title", label: "회원가입" },
    { type: "text", intent: "subtitle", label: "새 계정을 만들기 위한 정보를 입력해 주세요." },
    {
      type: "input",
      intent: "text-input",
      name: "Input / 이름",
      label: "이름",
      placeholder: "이름을 입력해 주세요.",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "input",
      intent: "text-input",
      name: "Input / 이메일",
      label: "이메일",
      placeholder: "이메일을 입력해 주세요.",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "input",
      intent: "text-input",
      name: "Input / 비밀번호",
      label: "비밀번호",
      placeholder: "비밀번호를 입력해 주세요.",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "button",
      intent: "primary-action",
      label: "회원가입",
      variant: "primary",
      size: "md",
      width: "full",
      fullWidth: true,
      block: true
    },
    {
      type: "button",
      section: "footer",
      intent: "secondary-action",
      label: "이미 계정이 있어요",
      variant: "ghost",
      size: "sm"
    }
  ]
};

const settingsPrompt: DesignPrompt = {
  screen: "settings",
  theme: "core",
  density: "comfortable",
  sections: ["header", "form", "action"],
  primaryAction: "Save changes",
  components: [
    { type: "text", intent: "title", label: "Settings" },
    {
      type: "input",
      intent: "text-input",
      label: "Workspace name",
      placeholder: "Enter a workspace name",
      size: "md",
      width: "full",
      fullWidth: true
    },
    {
      type: "button",
      intent: "primary-action",
      label: "Save changes",
      variant: "primary",
      size: "md",
      width: "full",
      fullWidth: true,
      block: true
    }
  ]
};

const dashboardPrompt: DesignPrompt = {
  screen: "dashboard",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "action"],
  primaryAction: "Create report",
  components: [
    { type: "text", intent: "title", label: "Dashboard" },
    { type: "button", intent: "primary-action", label: "Create report", variant: "primary", size: "md" },
    { type: "button", intent: "secondary-action", label: "View details", variant: "neutral", size: "md" }
  ]
};

const filterListPrompt: DesignPrompt = {
  screen: "list",
  theme: "core",
  density: "comfortable",
  sections: ["header", "filter", "list", "action"],
  primaryAction: "New item",
  components: [
    { type: "text", intent: "title", label: "Items" },
    { type: "filter-button", intent: "filter-action", label: "Active", selected: true, size: "md" },
    { type: "button", intent: "primary-action", label: "New item", variant: "primary", size: "md" }
  ]
};

const socialFeedPrompt: DesignPrompt = {
  screen: "feed",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "action"],
  primaryAction: "새 게시물",
  components: [
    { type: "text", intent: "title", label: "인스타그램" },
    { type: "text", intent: "subtitle", label: "스토리와 게시물을 탐색하는 피드 화면" },
    { type: "button", section: "header", intent: "secondary-action", label: "메시지", variant: "ghost", size: "sm" },
    { type: "filter-button", section: "content", intent: "filter-action", label: "스토리", selected: true, size: "sm" },
    { type: "text", section: "content", intent: "subtitle", label: "친구들의 최신 게시물을 확인해 보세요." },
    { type: "button", section: "content", intent: "secondary-action", label: "대표 게시물 보기", variant: "neutral", size: "md" },
    { type: "button", section: "action", intent: "primary-action", label: "새 게시물", variant: "primary", size: "md" }
  ]
};

const genericPagePrompt: DesignPrompt = {
  screen: "page",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "action"],
  primaryAction: "계속",
  components: [
    { type: "text", intent: "title", label: "새 화면" },
    { type: "text", intent: "subtitle", label: "프롬프트를 기반으로 구성된 기본 화면입니다." },
    { type: "text", section: "content", intent: "subtitle", label: "콘텐츠 영역" },
    { type: "button", section: "content", intent: "secondary-action", label: "대표 콘텐츠 보기", variant: "neutral", size: "md" },
    { type: "button", section: "action", intent: "primary-action", label: "계속", variant: "primary", size: "md" }
  ]
};

const hasKorean = (value: string) => /[가-힣]/.test(value);

const buildLoginPromptFromText = (rawPrompt: string, theme: string): DesignPrompt => {
  const korean = hasKorean(rawPrompt);
  const wantsPassword = /(password|비밀번호|패스워드|pw)/i.test(rawPrompt) || /(login|sign in|로그인)/i.test(rawPrompt);
  const wantsTitle = !/(제목 없이|타이틀 없이|title 없이)/i.test(rawPrompt);
  const wantsSignupLink = /(sign up|signup|register|join|회원가입|가입 링크|가입링크|회원 가입)/i.test(rawPrompt);
  const wantsSignupText = /(회원가입텍스트|회원 가입 텍스트|signup text|sign up text|가입 안내|계정이 없으신가요|처음이신가요)/i.test(rawPrompt);
  const title = korean ? "로그인" : "Sign in";
  const subtitle = korean ? "계정 정보를 입력해 주세요." : "Enter your account details.";
  const idLabel = korean ? "아이디" : "Email";
  const idPlaceholder = korean ? "아이디를 입력해 주세요." : "Enter your email";
  const passwordLabel = korean ? "비밀번호" : "Password";
  const passwordPlaceholder = korean ? "비밀번호를 입력해 주세요." : "Enter your password";
  const submitLabel = korean ? "로그인" : "Sign in";
  const signupLabel = korean ? "회원가입" : "Sign up";
  const signupText = korean ? "계정이 없으신가요?" : "Don't have an account?";

  return {
    screen: "login",
    theme,
    density: "comfortable",
    sections: ["header", "form", "action", "footer"],
    primaryAction: submitLabel,
    components: [
      ...(wantsTitle
        ? [
            { type: "text", intent: "title", label: title },
            { type: "text", intent: "subtitle", label: subtitle }
          ]
        : []),
      {
        type: "input",
        intent: "text-input",
        name: korean ? "Input / 아이디" : "Email Input",
        label: idLabel,
        placeholder: idPlaceholder,
        size: "md",
        width: "full",
        fullWidth: true
      },
      ...(wantsPassword
        ? [
            {
              type: "input",
              intent: "text-input",
              name: korean ? "Input / 비밀번호" : "Password Input",
              label: passwordLabel,
              placeholder: passwordPlaceholder,
              size: "md",
              width: "full",
              fullWidth: true
            }
          ]
        : []),
      {
        type: "button",
        intent: "primary-action",
        label: submitLabel,
        variant: "primary",
        size: "md",
        width: "full",
        fullWidth: true,
        block: true
      },
      ...(wantsSignupLink
        ? [
            ...(wantsSignupText
              ? [
                  {
                    type: "text",
                    section: "footer",
                    intent: "subtitle",
                    name: korean ? "Text / 회원가입 안내" : "Text / Sign up hint",
                    label: signupText
                  }
                ]
              : []),
            {
              type: "button",
              section: "footer",
              intent: "secondary-action",
              name: korean ? "Button / 회원가입" : "Button / Sign up",
              label: signupLabel,
              variant: "ghost",
              size: "sm"
            }
          ]
        : [])
    ]
  };
};

const buildSignupPromptFromText = (rawPrompt: string, theme: string): DesignPrompt => {
  const korean = hasKorean(rawPrompt);
  const wantsTitle = !/(제목 없이|타이틀 없이|title 없이)/i.test(rawPrompt);
  const wantsName = !/(이름 없이|name 없이)/i.test(rawPrompt);
  const wantsEmail = !/(이메일 없이|email 없이)/i.test(rawPrompt);
  const wantsPassword = !/(비밀번호 없이|password 없이|pw 없이)/i.test(rawPrompt);
  const wantsLoginLink = !/(로그인 링크 없이|login link 없이)/i.test(rawPrompt);

  const title = korean ? "회원가입" : "Create account";
  const subtitle = korean ? "새 계정을 만들기 위한 정보를 입력해 주세요." : "Enter the details for your new account.";
  const nameLabel = korean ? "이름" : "Name";
  const namePlaceholder = korean ? "이름을 입력해 주세요." : "Enter your name";
  const emailLabel = korean ? "이메일" : "Email";
  const emailPlaceholder = korean ? "이메일을 입력해 주세요." : "Enter your email";
  const passwordLabel = korean ? "비밀번호" : "Password";
  const passwordPlaceholder = korean ? "비밀번호를 입력해 주세요." : "Enter your password";
  const submitLabel = korean ? "회원가입" : "Create account";
  const loginLinkLabel = korean ? "이미 계정이 있어요" : "Already have an account";

  return {
    screen: "signup",
    theme,
    density: "comfortable",
    sections: ["header", "form", "action", "footer"],
    primaryAction: submitLabel,
    components: [
      ...(wantsTitle
        ? [
            { type: "text", intent: "title", label: title },
            { type: "text", intent: "subtitle", label: subtitle }
          ]
        : []),
      ...(wantsName
        ? [
            {
              type: "input",
              intent: "text-input",
              name: korean ? "Input / 이름" : "Input / Name",
              label: nameLabel,
              placeholder: namePlaceholder,
              size: "md",
              width: "full",
              fullWidth: true
            }
          ]
        : []),
      ...(wantsEmail
        ? [
            {
              type: "input",
              intent: "text-input",
              name: korean ? "Input / 이메일" : "Input / Email",
              label: emailLabel,
              placeholder: emailPlaceholder,
              size: "md",
              width: "full",
              fullWidth: true
            }
          ]
        : []),
      ...(wantsPassword
        ? [
            {
              type: "input",
              intent: "text-input",
              name: korean ? "Input / 비밀번호" : "Input / Password",
              label: passwordLabel,
              placeholder: passwordPlaceholder,
              size: "md",
              width: "full",
              fullWidth: true
            }
          ]
        : []),
      {
        type: "button",
        intent: "primary-action",
        label: submitLabel,
        variant: "primary",
        size: "md",
        width: "full",
        fullWidth: true,
        block: true
      },
      ...(wantsLoginLink
        ? [
            {
              type: "button",
              section: "footer",
              intent: "secondary-action",
              label: loginLinkLabel,
              variant: "ghost",
              size: "sm"
            }
          ]
        : [])
    ]
  };
};

const buildSettingsPromptFromText = (rawPrompt: string, theme: string): DesignPrompt => {
  const korean = hasKorean(rawPrompt);
  return {
    screen: "settings",
    theme,
    density: "comfortable",
    sections: ["header", "form", "action"],
    primaryAction: korean ? "저장" : "Save",
    components: [
      { type: "text", intent: "title", label: korean ? "설정" : "Settings" },
      {
        type: "input",
        intent: "text-input",
        label: korean ? "워크스페이스 이름" : "Workspace name",
        placeholder: korean ? "이름을 입력해 주세요." : "Enter a workspace name",
        size: "md",
        width: "full",
        fullWidth: true
      },
      {
        type: "button",
        intent: "primary-action",
        label: korean ? "저장" : "Save",
        variant: "primary",
        size: "md",
        width: "full",
        fullWidth: true,
        block: true
      }
    ]
  };
};

const templates: Record<string, DesignPrompt> = {
  catalog: catalogPrompt,
  playground: playgroundPrompt,
  login: loginPrompt,
  signup: signupPrompt,
  settings: settingsPrompt,
  dashboard: dashboardPrompt,
  feed: socialFeedPrompt,
  page: genericPagePrompt,
  "filter-list": filterListPrompt,
  list: filterListPrompt
};

export type MakerPromptArchetype =
  | "login"
  | "signup"
  | "settings"
  | "dashboard"
  | "list"
  | "feed"
  | "page";

const scoreKeywordMatches = (value: string, patterns: RegExp[]) =>
  patterns.reduce((score, pattern) => (pattern.test(value) ? score + 1 : score), 0);

const inferPromptArchetype = (rawPrompt: string): MakerPromptArchetype => {
  const normalized = rawPrompt.toLowerCase();
  const scores: Record<MakerPromptArchetype, number> = {
    login: scoreKeywordMatches(normalized, [
      /(login|log in|sign in|로그인|로그 인|signin)/i,
      /(아이디|이메일|비밀번호|패스워드|pw)/i,
      /(로그인 화면|로그인 페이지|sign in page)/i
    ]),
    signup: scoreKeywordMatches(normalized, [
      /(signup|sign up|register|join|회원가입|가입하기|계정 만들기|가입 페이지)/i,
      /(이름|name|confirm password|비밀번호 확인|약관 동의)/i,
      /(회원가입 화면|회원가입 페이지|create account)/i
    ]),
    settings: scoreKeywordMatches(normalized, [/(settings|setting|설정|preferences)/i]),
    dashboard: scoreKeywordMatches(normalized, [/(dashboard|대시보드)/i]),
    list: scoreKeywordMatches(normalized, [/(list|목록|리스트|filter|검색결과)/i]),
    feed: scoreKeywordMatches(normalized, [/(instagram|인스타|인스타그램|feed|social|timeline|게시물|스토리)/i]),
    page: 0
  };

  if (scores.login > 0 && scores.signup > 0) {
    if (scores.login >= scores.signup) {
      scores.signup = 0;
    } else {
      scores.login = 0;
    }
  }

  const best = (Object.entries(scores) as Array<[MakerPromptArchetype, number]>)
    .sort((a, b) => b[1] - a[1])[0];

  return best && best[1] > 0 ? best[0] : "page";
};

export const inferMakerPromptArchetype = inferPromptArchetype;

export const createPromptFromScreen = (screen: string, theme: string): DesignPrompt => {
  if (screen === "catalog") {
    return {
      ...catalogPrompt,
      theme
    };
  }

  if (screen === "button-inspection") {
    return createButtonInspectionPrompt(theme);
  }

  if (screen === "input-inspection") {
    return createInputInspectionPrompt(theme);
  }

  const promptFile = path.resolve(promptExamplesDir, `${screen}.prompt.json`);
  if (fs.existsSync(promptFile)) {
    const loaded = JSON.parse(fs.readFileSync(promptFile, "utf-8")) as DesignPrompt;
    return {
      ...loaded,
      theme
    };
  }

  const found = templates[screen];
  const base = found ?? loginPrompt;
  return {
    ...base,
    screen: found ? base.screen : (screen as DesignPrompt["screen"]),
    theme
  };
};

export const createPromptFromMakerPrompt = (rawPrompt: string, theme: string): DesignPrompt => {
  const archetype = inferPromptArchetype(rawPrompt);

  if (archetype === "login") {
    return buildLoginPromptFromText(rawPrompt, theme);
  }

  if (archetype === "signup") {
    return buildSignupPromptFromText(rawPrompt, theme);
  }

  if (archetype === "settings") {
    return buildSettingsPromptFromText(rawPrompt, theme);
  }

  return createPromptFromScreen(archetype, theme);
};
