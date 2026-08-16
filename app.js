// 飞机图片查询 - 交互逻辑
// 数据存储：Supabase（跨设备共享）。访客上传 → status=pending；开发者(Supabase 登录)审核 → approved。
// 审核写操作依赖 Supabase Auth + RLS，不再使用本地密码。
// 语言：localStorage 记忆，中文(zh) / 英文(en) 全站切换（含机型资料英文字段）。
(function () {
  "use strict";

  /* ============ 多语言 ============ */
  const I18N = {
    zh: {
      brandTitle: "飞机图片查询",
      brandSub: "按机型浏览客机资料与照片 · 支持上传投稿",
      navHome: "主页",
      navUpload: "上传图片",
      back: "← 返回机型列表",
      variantsTitle: "子型号",
      detailNoPhotos: "该机型暂无已通过审核的照片",
      photoCount: "机型照片（{n}）",
      pageInfo: "第 {cur} / {total} 页",
      tabHangar: "机库",
      devEntry: "开发者登录",
      searchPh: "按飞机注册号或机型搜索，例如：B-1234、A330、N12345…",
      devBadge: "● 开发者模式",
      devHint: "审核访客上传的图片，通过后会进入「推荐图片」公开展示",
      clearAll: "清空全部上传数据",
      devLogout: "退出开发者",
      devUpHead: "开发者直接上传 · 免审核立即公开",
      dropHint: "点击或拖拽照片到此处上传",
      devDropNote: "以开发者身份上传，将直接发布到「推荐图片」，无需审核",
      phReg: "如 B-1234",
      phType: "例如：A330-941neo",
      phNote: "选填，如 拍摄于上海浦东",
      regLabel: "注册号 *",
      typeLabel: "机型 *",
      noteLabel: "备注",
      cancel: "取消",
      devPublish: "直接发布（免审核）",
      recTitle: "推荐图片",
      recSub: "已通过审核的优质照片",
      recCount: "共 {n} 张推荐",
      dropAircraft: "点击或拖拽照片到此处上传飞机照片",
      upNote: "支持 JPG / PNG，上传后需开发者审核通过才会公开",
      submitReview: "提交审核",
      hangarEmpty: "还没有上传记录",
      footer: "访客上传的飞机照片经开发者审核通过后，会在「推荐图片」中公开推荐展示，供大家浏览欣赏。",
      wikiLink: "查看维基百科详情 →",
      mReject: "不通过（移至已拒绝）",
      devTitle: "开发者登录",
      devSub: "用 Supabase 账号登录后审核照片",
      emailLabel: "邮箱",
      passwordLabel: "密码",
      login: "登录",
      loginNetErr: "无法连接登录服务，请检查网络后点击「重试」",
      loginCredErr: "邮箱或密码不正确，请重试",
      retry: "重试",
      devNoAcct: "没有账号？请先在 Supabase 后台 Authentication 里用同一邮箱注册一个账号（建议关闭邮件确认以便自测）。",
      // 动态
      safetyZh: "本站已安全运行 {n} 天",
      safetyEn: "This site has been running safely for {n} days",
      recEmptyGuest: "还没有推荐的照片",
      recEmptyDev: "还没有审核通过的照片",
      matchOk: "将归入机型：{name}（照片通过审核后会显示在「推荐图片」中）",
      matchWarn: "未识别到对应机型，照片仍会提交，但不会进入推荐图片",
      devMatchOk: "将归入机型：{name}（直接发布到「推荐图片」）",
      devMatchWarn: "未识别到对应机型，照片仍会发布，但不会归类到具体机型",
      tipImg: "请选择图片文件",
      tipReg: "请填写注册号",
      tipType: "请填写机型，例如 A330-941neo",
      tipPick: "请先选择照片",
      submitting: "提交中…",
      submitted: "已提交，等待开发者审核 ✓",
      submitFail: "提交失败：",
      publishing: "发布中…",
      published: "已直接发布到「推荐图片」 ✓",
      publishFail: "发布失败：",
      statusPending: "待审核",
      statusApproved: "已通过",
      statusRejected: "已拒绝",
      noPending: "暂无待审核照片",
      colPending: "待审核",
      colApproved: "已通过",
      colRejected: "已拒绝",
      noPendingCol: "该分类下暂无照片",
      loadFail: "读取机库失败：",
      opFail: "操作失败：",
      cleared: "已清空所有上传数据",
      clearFail: "清空失败：",
      confirmClear: "确定清空所有访客上传的图片数据吗？此操作不可恢复。",
      confirmDelete: "确定要彻底删除这张照片（含图片数据）吗？删除后无法恢复。",
      upTitle: "用户上传的照片（审核通过后公开）",
      upEmpty: "还没有审核通过的照片，去「机库」上传吧 ✈️",
      specReg: "注册号",
      specType: "机型（填写）",
      specMatched: "归属机型",
      specStatus: "状态",
      specTime: "上传时间",
      myPhoto: "我的照片",
      specMfr: "制造商",
      specCountry: "国家 / 地区",
      specFirst: "首飞年份",
      specSeats: "典型座位",
      specRange: "最大航程",
      specCruise: "巡航速度",
      specEngines: "发动机",
      specCategory: "类别",
      modelPrefix: "子型号："
    },
    en: {
      brandTitle: "Aircraft Gallery",
      brandSub: "Browse airliner profiles by type and upload your photos",
      navHome: "Home",
      navUpload: "Upload Photos",
      back: "← Back to aircraft list",
      variantsTitle: "Variants",
      detailNoPhotos: "No approved photos for this aircraft yet",
      photoCount: "Photos ({n})",
      pageInfo: "Page {cur} of {total}",
      tabHangar: "Hangar",
      devEntry: "Developer Login",
      searchPh: "Search by registration or aircraft type, e.g. B-1234, A330, N12345…",
      devBadge: "● Developer Mode",
      devHint: "Review visitor uploads; approved photos appear in 'Recommended Photos'",
      clearAll: "Clear All Uploads",
      devLogout: "Log Out",
      devUpHead: "Developer Direct Upload · Published Immediately, No Review",
      dropHint: "Click or drag photos here to upload",
      devDropNote: "Uploaded as developer: published straight to 'Recommended Photos', no review needed",
      phReg: "e.g. B-1234",
      phType: "e.g. A330-941neo",
      phNote: "Optional, e.g. Shot at Shanghai Pudong",
      regLabel: "Registration *",
      typeLabel: "Aircraft type *",
      noteLabel: "Note",
      cancel: "Cancel",
      devPublish: "Publish Directly (No Review)",
      recTitle: "Recommended Photos",
      recSub: "High-quality photos approved by reviewers",
      recCount: "{n} recommended",
      dropAircraft: "Click or drag an aircraft photo here to upload",
      upNote: "JPG / PNG supported. Photos go public only after developer approval",
      submitReview: "Submit for Review",
      hangarEmpty: "No uploads yet",
      footer: "Visitor-uploaded aircraft photos are publicly recommended in 'Recommended Photos' after developer approval.",
      wikiLink: "View on Wikipedia →",
      mReject: "Reject (move to Rejected)",
      devTitle: "Developer Login",
      devSub: "Log in with your Supabase account to review photos",
      emailLabel: "Email",
      passwordLabel: "Password",
      login: "Log In",
      loginNetErr: "Cannot reach the login service. Check your network and tap Retry.",
      loginCredErr: "Email or password is incorrect. Please try again.",
      retry: "Retry",
      devNoAcct: "No account? Register one with the same email in Supabase Authentication (disable email confirmation for self-testing).",
      safetyZh: "本站已安全运行 {n} 天",
      safetyEn: "This site has been running safely for {n} days",
      recEmptyGuest: "No recommended photos yet",
      recEmptyDev: "No approved photos yet",
      matchOk: "Will be filed under: {name} (appears in 'Recommended Photos' after approval)",
      matchWarn: "No matching aircraft recognized; photo will be submitted but won't appear in Recommended Photos",
      devMatchOk: "Will be filed under: {name} (published directly to 'Recommended Photos')",
      devMatchWarn: "No matching aircraft; photo will be published but not categorized",
      tipImg: "Please select an image file",
      tipReg: "Please enter the registration",
      tipType: "Please enter the aircraft type, e.g. A330-941neo",
      tipPick: "Please select a photo first",
      submitting: "Submitting…",
      submitted: "Submitted, awaiting developer review ✓",
      submitFail: "Submission failed: ",
      publishing: "Publishing…",
      published: "Published directly to 'Recommended Photos' ✓",
      publishFail: "Publish failed: ",
      statusPending: "Pending",
      statusApproved: "Approved",
      statusRejected: "Rejected",
      noPending: "No photos pending review",
      colPending: "Pending",
      colApproved: "Approved",
      colRejected: "Rejected",
      noPendingCol: "No photos in this category",
      loadFail: "Failed to load hangar: ",
      opFail: "Operation failed: ",
      cleared: "All uploads cleared",
      clearFail: "Failed to clear: ",
      confirmClear: "Clear all visitor-uploaded photos? This cannot be undone.",
      upTitle: "User-uploaded photos (public after approval)",
      upEmpty: "No approved photos yet. Upload some in the Hangar ✈️",
      specReg: "Registration",
      specType: "Aircraft (entered)",
      specMatched: "Matched aircraft",
      specStatus: "Status",
      specTime: "Upload time",
      myPhoto: "My Photo",
      specMfr: "Manufacturer",
      specCountry: "Country / Region",
      specFirst: "First flight",
      specSeats: "Typical seats",
      specRange: "Max range",
      specCruise: "Cruise speed",
      specEngines: "Engines",
      specCategory: "Category",
      modelPrefix: "Variant: ",
      confirmDelete: "Permanently delete this photo (including the image)? This cannot be undone."
    }
  };
  let LANG = (function () { try { return localStorage.getItem("lang") || "zh"; } catch (e) { return "zh"; } })();
  function t(key, vars) {
    let s = (I18N[LANG] && I18N[LANG][key] != null) ? I18N[LANG][key]
      : (I18N.zh[key] != null ? I18N.zh[key] : key);
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  function en() { return LANG === "en"; }
  function statusText(s) {
    return s === "approved" ? t("statusApproved") : s === "rejected" ? t("statusRejected") : t("statusPending");
  }

  /* ============ Supabase 客户端 ============ */
  const SB_URL = "https://kmvgarkjzassujmtwvpa.supabase.co";
  const SB_KEY = "sb_publishable__s5hElHdjvao1Ex98Kt_AQ_JH10mHX5";
  const sb = window.supabase.createClient(SB_URL, SB_KEY);
  let currentUser = null;
  function isDev() { return !!currentUser; }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ============ 安全运行天数（自 2026-07-30 起） ============ */
  const SAFE_START = new Date(2026, 6, 30); // 月份从 0 开始，6 = 7月
  function safeDays() { return Math.max(0, Math.floor((Date.now() - SAFE_START) / 86400000)); }

  /* ============ 应用多语言 ============ */
  const safetyEl = document.getElementById("safety");
  const langToggle = document.getElementById("langToggle");
  function applyI18n() {
    document.documentElement.lang = en() ? "en" : "zh-CN";
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.setAttribute("placeholder", t(el.dataset.i18nPh)); });
    // 安全运行文案（含数字）
    const d = safeDays();
    if (safetyEl) safetyEl.innerHTML = (en() ? t("safetyEn", { n: d }) : t("safetyZh", { n: d }))
      .replace(String(d), '<b id="safeDays">' + d + "</b>");
    if (langToggle) langToggle.textContent = en() ? "中文" : "English";
  }
  if (langToggle) langToggle.addEventListener("click", () => {
    LANG = en() ? "zh" : "en";
    try { localStorage.setItem("lang", LANG); } catch (e) {}
    applyI18n();
    renderCatalog();
    if (currentView === "detail" && currentFamily) openFamilyDetail(currentFamily);
    else showView(currentView);
    if (isDev()) renderHangar();
  });

  /* ============ 开发者登录（Supabase Auth） ============ */
  const devModal = document.getElementById("devModal");
  const devEntry = document.getElementById("devEntry");
  const devEmail = document.getElementById("devEmail");
  const devPass = document.getElementById("devPass");
  const devTip = document.getElementById("devTip");
  const devLogin = document.getElementById("devLogin");
  const devBar = document.getElementById("devBar");
  const devLogout = document.getElementById("devLogout");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const uploader = document.getElementById("uploader");
  const uploadForm = document.getElementById("uploadForm");
  const recSection = document.getElementById("recSection");
  const recGrid = document.getElementById("recGrid");
  const recCount = document.getElementById("recCount");
  const recEmpty = document.getElementById("recEmpty");
  const devReview = document.getElementById("devReview");
  const searchBox = document.querySelector(".search-box");

  /* 开发者直接上传（免审核）相关元素 */
  const devUploader = document.getElementById("devUploader");
  const devDropzone = document.getElementById("devDropzone");
  const devFileInput = document.getElementById("devFileInput");
  const devUploadForm = document.getElementById("devUploadForm");
  const devRegInput = document.getElementById("devRegInput");
  const devTypeInput = document.getElementById("devTypeInput");
  const devNoteInput = document.getElementById("devNoteInput");
  const devMatch = document.getElementById("devMatch");
  const devUfTip = document.getElementById("devUfTip");
  const devCancel = document.getElementById("devCancel");
  const devPublish = document.getElementById("devPublish");
  let pendingDevFile = null;
  let pendingDevUrl = null;

  function applyDevUI() {
    const dev = isDev();
    devBar.hidden = !dev;
    devEntry.hidden = dev;
    uploader.hidden = dev;
    if (dev) uploadForm.hidden = true;
    devUploader.hidden = !dev;          // 开发者直接上传区：仅开发者可见
    if (dev) devUploadForm.hidden = true; // 进入开发者模式时收起表单
    recSection.hidden = false;  // 推荐图片（approved 墙）所有访客均可浏览
    if (devReview) devReview.hidden = !dev;     // 开发者三栏审核台仅开发者可见
    hangarEmpty.hidden = !dev;
    if (searchBox) searchBox.hidden = false;  // 搜索栏对所有访客可见（搜索推荐图片）
  }
  function closeDev() { devModal.hidden = true; }
  devEntry.addEventListener("click", () => {
    devEmail.value = ""; devPass.value = "";
    devTip.textContent = ""; devTip.className = "dev-tip";
    devLogin.textContent = t("login"); devLogin.disabled = false;
    devModal.hidden = false; devEmail.focus();
  });
  devModal.querySelectorAll("[data-close-dev]").forEach((el) => el.addEventListener("click", closeDev));
  devLogin.addEventListener("click", () => {
    devLogin.disabled = true;
    devTip.textContent = t("submitting"); devTip.className = "dev-tip";
    sb.auth.signInWithPassword({ email: devEmail.value.trim(), password: devPass.value })
      .then(({ error }) => {
        if (error) {
          devTip.textContent = t("loginCredErr");
          devTip.className = "dev-tip err";
          devLogin.textContent = t("retry");
          devLogin.disabled = false;
          return;
        }
        closeDev(); // onAuthStateChange 会刷新界面
      })
      .catch((err) => {
        devTip.textContent = t("loginNetErr");
        devTip.className = "dev-tip err";
        devLogin.textContent = t("retry");
        devLogin.disabled = false;
      });
  });
  devPass.addEventListener("keydown", (e) => { if (e.key === "Enter") devLogin.click(); });
  devLogout.addEventListener("click", () => { sb.auth.signOut(); });

  /* ============ 云端存储封装（Supabase） ============ */
  async function dbAll() {
    const { data, error } = await sb.from("photos").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  async function dbDelete(id) {
    const { error } = await sb.from("photos").delete().eq("id", id);
    if (error) throw error;
  }
  async function dbClear() {
    const { error } = await sb.from("photos").delete().neq("id", "__never__");
    if (error) throw error;
  }

  /* ============ Tab 切换（已移除多标签，保留空保护） ============ */
  const tabs = document.getElementById("tabs");
  const modal = document.getElementById("modal");
  if (tabs) {
    tabs.querySelectorAll(".tab").forEach((tt) => {
      tt.addEventListener("click", () => {
        tabs.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
        tt.classList.add("active");
        applyDevUI();
        renderHangar();
      });
    });
  }

  /* ============ 机型详情弹窗（当前未直接调用，保留英文支持） ============ */
  function openModal(a) {
    document.getElementById("mWiki").style.display = "";
    document.getElementById("mImg").src = a.image;
    document.getElementById("mImg").alt = en() ? (a.nameEn || a.name) : a.name;
    document.getElementById("mName").textContent = en() ? (a.nameEn || a.name) : a.name;
    document.getElementById("mCat").textContent = en() ? (a.categoryEn || a.category) : a.category;
    document.getElementById("mModel").textContent = (en() ? (a.subEn || a.sub) : a.sub) ? (t("modelPrefix") + (en() ? (a.subEn || a.sub) : a.sub)) : (en() ? (a.model || "") : (a.model || ""));
    document.getElementById("mDesc").textContent = en() ? (a.familyDescEn || a.descEn || a.desc || a.familyDesc || "") : (a.desc || a.familyDesc || "");
    document.getElementById("mWiki").href = a.wiki || a.familyWiki || "#";
    const specs = [
      [t("specMfr"), en() ? (a.manufacturerEn || a.manufacturer) : a.manufacturer],
      [t("specCountry"), en() ? (a.countryEn || a.country) : a.country],
      [t("specFirst"), a.firstFlight],
      [t("specSeats"), a.seats],
      [t("specRange"), a.range],
      [t("specCruise"), a.cruise],
      [t("specEngines"), en() ? (a.enginesEn || a.engines) : a.engines],
      [t("specCategory"), en() ? (a.categoryEn || a.category) : a.category]
    ];
    document.getElementById("mSpecs").innerHTML = specs
      .map(([k, v]) => `<div class="spec"><div class="k">${k}</div><div class="v">${esc(v)}</div></div>`).join("");

    const up = document.getElementById("mUserPhotos");
    up.innerHTML = '<div class="up-title">' + t("upTitle") + "</div>";
    sb.from("photos").select("*").eq("aircraft", a.id).eq("status", "approved").then(({ data, error }) => {
      if (error) { up.innerHTML += '<div class="up-empty">' + t("upEmpty") + "</div>"; return; }
      const mine = data || [];
      if (!mine.length) { up.innerHTML += '<div class="up-empty">' + t("upEmpty") + "</div>"; return; }
      const g = document.createElement("div");
      g.className = "up-grid";
      mine.forEach((p) => {
        const item = document.createElement("div");
        item.className = "up-item";
        item.innerHTML = `<img src="${p.file}" alt="${esc(p.reg)}" onerror="this.style.display='none'" /><div class="cap">${esc(p.reg)}${p.note ? " · " + esc(p.note) : ""}</div>`;
        g.appendChild(item);
      });
      up.appendChild(g);
    });

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function openHangarModal(rec) {
    document.getElementById("mWiki").style.display = "none";
    document.getElementById("mImg").src = rec.file;
    document.getElementById("mImg").alt = rec.reg;
    document.getElementById("mName").textContent = rec.reg;
    document.getElementById("mCat").textContent = t("myPhoto");
    document.getElementById("mModel").textContent = rec.note || "";
    document.getElementById("mDesc").textContent = "";
    document.getElementById("mUserPhotos").innerHTML = "";
    const ac = rec.aircraft ? BY_ID[rec.aircraft] : null;
    const matched = (en() && ac && ac.nameEn) ? ac.nameEn : (rec.matched_name || t("specMatched") + " —");
    const d = new Date(rec.created_at);
    const specs = [
      [t("specReg"), rec.reg],
      [t("specType"), rec.type || "—"],
      [t("specMatched"), matched],
      [t("specStatus"), statusText(rec.status)],
      [t("specTime"), isNaN(d) ? "—" : d.toLocaleString(en() ? "en-US" : "zh-CN")]
    ];
    document.getElementById("mSpecs").innerHTML = specs
      .map(([k, v]) => `<div class="spec"><div class="k">${k}</div><div class="v">${esc(v)}</div></div>`).join("");
    // 开发者模式下，弹窗内提供「不通过（移至已拒绝）」按钮
    const mDevActions = document.getElementById("mDevActions");
    const mReject = document.getElementById("mReject");
    if (isDev()) {
      mDevActions.hidden = false;
      mReject.onclick = () => {
        setStatus(rec.id, "rejected");
        closeModal();
      };
    } else {
      mDevActions.hidden = true;
    }
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ============ 机库 / 审核台（三栏，置于 devReview 内） ============ */
  const hangarEmpty = document.getElementById("hangarEmpty");
  const hangarCount = document.getElementById("hangarCount");
  const gridPending = document.getElementById("gridPending");
  const gridApproved = document.getElementById("gridApproved");
  const gridRejected = document.getElementById("gridRejected");
  const cntPending = document.getElementById("cntPending");
  const cntApproved = document.getElementById("cntApproved");
  const cntRejected = document.getElementById("cntRejected");
  const emptyPending = document.getElementById("emptyPending");
  const emptyApproved = document.getElementById("emptyApproved");
  const emptyRejected = document.getElementById("emptyRejected");
  const regSearch = document.getElementById("regSearch");
  const regClear = document.getElementById("regClear");

  /* ---- 机型手填 + 智能归类 ---- */
  const typeInput = document.getElementById("typeInput");
  const ufMatch = document.getElementById("ufMatch");

  function normKey(s) { return String(s == null ? "" : s).toUpperCase().replace(/[^A-Z0-9]/g, ""); }

  const MATCH_INDEX = AIRCRAFT.map((a) => {
    const keys = [];
    const push = (s) => { const k = normKey(s); if (k.length >= 2 && keys.indexOf(k) < 0) keys.push(k); };
    push(a.id);
    push(a.name);
    push(a.nameEn);
    String(a.sub || "").split(/[\/、,，]/).forEach(push);
    push(a.subEn);
    return {
      ac: a,
      keys: keys,
      familyKey: normKey(a.familyName) || normKey(a.familyId),
      blob: normKey([a.id, a.name, a.nameEn, a.sub, a.familyName, a.familyId].join(" "))
    };
  });

  const ALIASES = {
    "738": "b737-ng", "739": "b737-ng", "73H": "b737-ng", "73G": "b737-ng", "737": "b737-ng",
    "7M8": "b737-max", "7M9": "b737-max", "B38M": "b737-max", "B39M": "b737-max",
    "744": "b747-400", "B744": "b747-400", "748": "b747-8", "B748": "b747-8",
    "752": "b757-200", "B752": "b757-200", "753": "b757-300", "B753": "b757-300",
    "763": "b767-300er", "B763": "b767-300er", "764": "b767-400er", "B764": "b767-400er",
    "772": "b777-200", "B772": "b777-200", "77E": "b777-200er", "B77E": "b777-200er",
    "77L": "b777-200lr", "B77L": "b777-200lr", "77W": "b777-300er", "B77W": "b777-300er", "773": "b777-300er",
    "788": "b787-8", "B788": "b787-8", "789": "b787-9", "B789": "b787-9", "78J": "b787-10", "B78X": "b787-10",
    "318": "a318", "319": "a319", "31N": "a319", "320": "a320", "32N": "a320",
    "321": "a321", "32Q": "a321", "A20N": "a320", "A21N": "a321", "A19N": "a319",
    "332": "a330-200", "A332": "a330-200", "333": "a330-300", "A333": "a330-300",
    "338": "a330neo", "339": "a330neo", "A338": "a330neo", "A339": "a330neo",
    "359": "a350-900", "A359": "a350-900", "351": "a350-1000", "A35K": "a350-1000",
    "388": "a380-800", "A388": "a380-800",
    "221": "a220-100", "BCS1": "a220-100", "223": "a220-300", "BCS3": "a220-300"
  };
  const BY_ID = {};
  AIRCRAFT.forEach((a) => { BY_ID[a.id] = a; });

  function matchAircraft(text) {
    const input = normKey(text);
    if (input.length < 2) return null;
    if (ALIASES[input] && BY_ID[ALIASES[input]]) return BY_ID[ALIASES[input]];
    const ab = input.match(/^A(\d{3})(\d)(\d{2})/);
    if (ab) {
      const derived = "A" + ab[1] + ab[2] + "00";
      const hit = MATCH_INDEX.find((m) => m.keys.indexOf(derived) >= 0 || m.blob.indexOf(derived) >= 0);
      if (hit) return hit.ac;
    }
    const tokens = String(text).toUpperCase().match(/[A-Z]+|\d+/g) || [];
    let best = null, bestScore = 0;
    MATCH_INDEX.forEach((m) => {
      let score = 0;
      m.keys.forEach((k) => {
        let s = 0;
        if (input === k) s = (k === normKey(m.ac.nameEn) && en()) ? 100 + k.length + 1 : 100 + k.length;
        else if (input.indexOf(k) >= 0) s = 50 + k.length;
        else if (k.indexOf(input) >= 0) s = 30 + input.length;
        if (s > score) score = s;
      });
      if (m.familyKey && m.familyKey.length >= 3 && input.indexOf(m.familyKey) >= 0) {
        const s = Math.round((50 + m.familyKey.length) * 0.6);
        if (s > score) score = s;
      }
      if (score > 0) {
        tokens.forEach((tk) => {
          if (tk.length < 2) return;
          if (m.blob.indexOf(tk) < 0) return;
          score += /^\d+$/.test(tk) ? 6 : 14;
        });
      }
      if (score > bestScore) { bestScore = score; best = m.ac; }
    });
    return bestScore > 0 ? best : null;
  }

  function updateMatchHint() {
    const v = typeInput.value.trim();
    if (!v) { ufMatch.textContent = ""; ufMatch.className = "uf-match"; return; }
    const hit = matchAircraft(v);
    const name = hit ? (en() ? (hit.nameEn || hit.name) : hit.name) : "";
    if (hit) {
      ufMatch.textContent = t("matchOk", { name });
      ufMatch.className = "uf-match ok";
    } else {
      ufMatch.textContent = t("matchWarn");
      ufMatch.className = "uf-match warn";
    }
  }
  typeInput.addEventListener("input", updateMatchHint);

  function modCard(p) {
    const card = document.createElement("article");
    card.className = "card"; card.tabIndex = 0;
    const badge = `<span class="status-badge ${p.status}">${statusText(p.status)}</span>`;
    let actions = "";
    if (p.status === "pending") {
      actions = `<div class="mod-actions">
          <button class="approve" title="通过" aria-label="通过">✓</button>
          <button class="reject" title="不通过（移至已拒绝）" aria-label="不通过">✕</button>
        </div>`;
    } else if (p.status === "approved") {
      actions = `<div class="mod-actions">
          <button class="reject" title="不通过（移至已拒绝）" aria-label="不通过">✕</button>
        </div>`;
    } else if (p.status === "rejected") {
      actions = `<div class="mod-actions">
          <button class="del" title="彻底删除图片" aria-label="删除">🗑</button>
        </div>`;
    }
    card.innerHTML = `
      <div class="card-img">
        ${badge}${actions}
        <img src="${p.file}" alt="${esc(p.reg)}" onerror="this.parentElement.style.background='#22304a'" />
      </div>
      <div class="hangar-cap"><p class="h-reg">${esc(p.reg)}</p><p class="h-type">${esc(p.type || "未填写机型")}</p></div>`;
    const ap = card.querySelector(".approve");
    if (ap) ap.addEventListener("click", (e) => { e.stopPropagation(); setStatus(p.id, "approved"); });
    const rj = card.querySelector(".reject");
    if (rj) rj.addEventListener("click", (e) => { e.stopPropagation(); setStatus(p.id, "rejected"); });
    const dl = card.querySelector(".del");
    if (dl) dl.addEventListener("click", (e) => { e.stopPropagation(); if (confirm(t("confirmDelete"))) deletePhoto(p.id); });
    card.addEventListener("click", () => openHangarModal(p));
    return card;
  }

  function recCard(p) {
    const card = document.createElement("article");
    card.className = "card"; card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-img">
        <img src="${p.file}" alt="${esc(p.reg)}" onerror="this.parentElement.style.background='#22304a'" />
      </div>
      <div class="hangar-cap"><p class="h-reg">${esc(p.reg)}</p><p class="h-type">${esc(p.type || "未填写机型")}</p></div>`;
    card.addEventListener("click", () => openHangarModal(p));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") openHangarModal(p); });
    return card;
  }

  async function setStatus(id, status) {
    if (!isDev()) return;
    const { error } = await sb.from("photos").update({ status }).eq("id", id);
    if (error) { alert(t("opFail") + error.message); return; }
    refreshAll();
  }

  async function deletePhoto(id) {
    if (!isDev()) return;
    try {
      await dbDelete(id);
      refreshAll();
    } catch (err) {
      alert(t("opFail") + err.message);
    }
  }

  async function renderHangar() {
    if (!isDev()) return;
    const kw = regSearch.value.trim().toLowerCase();
    try {
      const list = await dbAll();
      let items = list || [];
      if (kw) items = items.filter((p) => (p.reg + " " + (p.type || "") + " " + (p.note || "")).toLowerCase().includes(kw));
      // 按状态分三组
      const pending = items.filter((p) => p.status === "pending").sort((a, b) => b.created_at - a.created_at);
      const approved = items.filter((p) => p.status === "approved").sort((a, b) => b.created_at - a.created_at);
      const rejected = items.filter((p) => p.status === "rejected").sort((a, b) => b.created_at - a.created_at);
      hangarCount.textContent = en() ? (items.length + " photos") : ("共 " + items.length + " 张照片");
      cntPending.textContent = pending.length;
      cntApproved.textContent = approved.length;
      cntRejected.textContent = rejected.length;
      fillCol(gridPending, emptyPending, pending);
      fillCol(gridApproved, emptyApproved, approved);
      fillCol(gridRejected, emptyRejected, rejected);
      const total = items.length;
      hangarEmpty.hidden = total > 0;
      if (!total) hangarEmpty.querySelector("p").textContent = t("hangarEmpty");
    } catch (err) {
      hangarEmpty.hidden = false;
      hangarEmpty.querySelector("p").textContent = t("loadFail") + err.message;
    }
  }

  function fillCol(grid, emptyEl, arr) {
    grid.innerHTML = "";
    emptyEl.hidden = arr.length > 0;
    arr.forEach((p) => grid.appendChild(modCard(p)));
  }

  async function refreshAll() {
    await loadApproved();
    renderRecommend();
        renderCatalog();
    if (isDev()) renderHangar();
  }


  async function renderRecommend() {
    if (!recGrid) return;
    const kw = (regSearch ? regSearch.value : "").trim().toLowerCase();
    let approved = APPROVED_CACHE.slice();
    if (kw) approved = approved.filter((p) => (p.reg + " " + (p.type || "") + " " + (p.note || "") + " " + (p.matched_name || "")).toLowerCase().includes(kw));
    recCount.textContent = t("recCount", { n: approved.length });
    recGrid.innerHTML = "";
    recEmpty.hidden = approved.length > 0;
    recEmpty.querySelector("p").textContent = isDev() ? t("recEmptyDev") : t("recEmptyGuest");
    if (!approved.length) return;
    approved.forEach((p) => recGrid.appendChild(recCard(p)));
  }

  clearAllBtn.addEventListener("click", () => {
    if (!isDev()) return;
    if (confirm(t("confirmClear"))) {
      dbClear().then(() => { refreshAll(); alert(t("cleared")); }).catch((err) => alert(t("clearFail") + err.message));
    }
  });

  function onSearch() {
    renderRecommend();
        if (isDev()) renderHangar();
  }
  regSearch.addEventListener("input", onSearch);
  regClear.addEventListener("click", () => { regSearch.value = ""; regSearch.focus(); onSearch(); });

  /* ============ 上传（普通访客） ============ */
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const cancelAdd = document.getElementById("cancelAdd");
  const addBtn = document.getElementById("addBtn");
  const regInput = document.getElementById("regInput");
  const noteInput = document.getElementById("noteInput");
  const ufTip = document.getElementById("ufTip");
  let pendingFile = null;
  let pendingUrl = null;

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); } });
  dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("drag"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag"));
  dropzone.addEventListener("drop", (e) => { e.preventDefault(); dropzone.classList.remove("drag"); const f = e.dataTransfer.files[0]; if (f) handleFile(f); });
  fileInput.addEventListener("change", (e) => { const f = e.target.files[0]; if (f) handleFile(f); });

  function handleFile(f) {
    if (!f.type.startsWith("image/")) { ufTip.textContent = t("tipImg"); ufTip.className = "uf-tip"; return; }
    pendingFile = f;
    uploadForm.hidden = false;
    let prev = uploadForm.querySelector(".uf-preview");
    if (!prev) { prev = document.createElement("img"); prev.className = "uf-preview"; uploadForm.insertBefore(prev, uploadForm.firstChild); }
    if (pendingUrl) URL.revokeObjectURL(pendingUrl);
    pendingUrl = URL.createObjectURL(f);
    prev.src = pendingUrl;
    regInput.value = ""; typeInput.value = ""; noteInput.value = "";
    ufMatch.textContent = ""; ufMatch.className = "uf-match";
    ufTip.textContent = ""; ufTip.className = "uf-tip";
    regInput.focus();
  }
  function resetUpload() {
    uploadForm.hidden = true;
    pendingFile = null;
    if (pendingUrl) { URL.revokeObjectURL(pendingUrl); pendingUrl = null; }
    fileInput.value = "";
  }
  cancelAdd.addEventListener("click", resetUpload);

  function compressImage(file, maxW, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          try { resolve(canvas.toDataURL("image/jpeg", quality)); }
          catch (e) { reject(e); }
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  addBtn.addEventListener("click", () => {
    const reg = regInput.value.trim();
    const typeText = typeInput.value.trim();
    if (!reg) { ufTip.textContent = t("tipReg"); ufTip.className = "uf-tip"; regInput.focus(); return; }
    if (!typeText) { ufTip.textContent = t("tipType"); ufTip.className = "uf-tip"; typeInput.focus(); return; }
    if (!pendingFile) { ufTip.textContent = t("tipPick"); ufTip.className = "uf-tip"; return; }
    const hit = matchAircraft(typeText);
    addBtn.disabled = true;
    ufTip.textContent = t("submitting"); ufTip.className = "uf-tip";
    compressImage(pendingFile, 1280, 0.82)
      .then((dataUrl) => {
        const rec = {
          id: "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
          aircraft: hit ? hit.id : "",
          matched_name: hit ? (en() ? (hit.nameEn || hit.name) : hit.name) : "",
          type: typeText,
          reg: reg,
          note: noteInput.value.trim(),
          file: dataUrl,
          status: "pending",
          created_at: Date.now()
        };
        return sb.from("photos").insert(rec);
      })
      .then(({ error }) => {
        if (error) throw error;
        resetUpload();
        ufTip.textContent = t("submitted"); ufTip.className = "uf-tip ok";
        setTimeout(() => { ufTip.textContent = ""; }, 2000);
        refreshAll();
      })
      .catch((err) => { ufTip.textContent = t("submitFail") + (err.message || err); ufTip.className = "uf-tip"; })
      .finally(() => { addBtn.disabled = false; });
  });

  /* ============ 开发者直接上传（免审核，立即公开） ============ */
  devDropzone.addEventListener("click", () => devFileInput.click());
  devDropzone.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); devFileInput.click(); } });
  devDropzone.addEventListener("dragover", (e) => { e.preventDefault(); devDropzone.classList.add("drag"); });
  devDropzone.addEventListener("dragleave", () => devDropzone.classList.remove("drag"));
  devDropzone.addEventListener("drop", (e) => { e.preventDefault(); devDropzone.classList.remove("drag"); const f = e.dataTransfer.files[0]; if (f) devHandleFile(f); });
  devFileInput.addEventListener("change", (e) => { const f = e.target.files[0]; if (f) devHandleFile(f); });

  function devHandleFile(f) {
    if (!f.type.startsWith("image/")) { devUfTip.textContent = t("tipImg"); devUfTip.className = "uf-tip"; return; }
    pendingDevFile = f;
    devUploadForm.hidden = false;
    let prev = devUploadForm.querySelector(".uf-preview");
    if (!prev) { prev = document.createElement("img"); prev.className = "uf-preview"; devUploadForm.insertBefore(prev, devUploadForm.firstChild); }
    if (pendingDevUrl) URL.revokeObjectURL(pendingDevUrl);
    pendingDevUrl = URL.createObjectURL(f);
    prev.src = pendingDevUrl;
    devRegInput.value = ""; devTypeInput.value = ""; devNoteInput.value = "";
    devMatch.textContent = ""; devMatch.className = "uf-match";
    devUfTip.textContent = ""; devUfTip.className = "uf-tip";
    devRegInput.focus();
  }
  function devResetUpload() {
    devUploadForm.hidden = true;
    pendingDevFile = null;
    if (pendingDevUrl) { URL.revokeObjectURL(pendingDevUrl); pendingDevUrl = null; }
    devFileInput.value = "";
  }
  devCancel.addEventListener("click", devResetUpload);

  devTypeInput.addEventListener("input", () => {
    const v = devTypeInput.value.trim();
    if (!v) { devMatch.textContent = ""; devMatch.className = "uf-match"; return; }
    const hit = matchAircraft(v);
    const name = hit ? (en() ? (hit.nameEn || hit.name) : hit.name) : "";
    if (hit) { devMatch.textContent = t("devMatchOk", { name }); devMatch.className = "uf-match ok"; }
    else { devMatch.textContent = t("devMatchWarn"); devMatch.className = "uf-match warn"; }
  });

  devPublish.addEventListener("click", () => {
    const reg = devRegInput.value.trim();
    const typeText = devTypeInput.value.trim();
    if (!reg) { devUfTip.textContent = t("tipReg"); devUfTip.className = "uf-tip"; devRegInput.focus(); return; }
    if (!typeText) { devUfTip.textContent = t("tipType"); devUfTip.className = "uf-tip"; devTypeInput.focus(); return; }
    if (!pendingDevFile) { devUfTip.textContent = t("tipPick"); devUfTip.className = "uf-tip"; return; }
    const hit = matchAircraft(typeText);
    devPublish.disabled = true;
    devUfTip.textContent = t("publishing"); devUfTip.className = "uf-tip";
    compressImage(pendingDevFile, 1280, 0.82)
      .then((dataUrl) => {
        const rec = {
          id: "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
          aircraft: hit ? hit.id : "",
          matched_name: hit ? (en() ? (hit.nameEn || hit.name) : hit.name) : "",
          type: typeText,
          reg: reg,
          note: devNoteInput.value.trim(),
          file: dataUrl,
          status: "pending",
          created_at: Date.now()
        };
        return sb.from("photos").insert(rec)
          .then(({ error }) => { if (error) throw error; return rec.id; })
          .then((id) => sb.from("photos").update({ status: "approved" }).eq("id", id));
      })
      .then(({ error }) => {
        if (error) throw error;
        devResetUpload();
        devUfTip.textContent = t("published"); devUfTip.className = "uf-tip ok";
        setTimeout(() => { devUfTip.textContent = ""; }, 2500);
        refreshAll();
      })
      .catch((err) => { devUfTip.textContent = t("publishFail") + (err.message || err); devUfTip.className = "uf-tip"; })
      .finally(() => { devPublish.disabled = false; });
  });

  /* ============ 机型目录（主页）+ 机型详情 + 翻页 ============ */
  const catalog = document.getElementById("catalog");
  const viewHome = document.getElementById("view-home");
  const viewUpload = document.getElementById("view-upload");
  const viewDetail = document.getElementById("view-detail");
  const backBtn = document.getElementById("backBtn");
  const dImg = document.getElementById("dImg");
  const dName = document.getElementById("dName");
  const dSub = document.getElementById("dSub");
  const dDesc = document.getElementById("dDesc");
  const dWiki = document.getElementById("dWiki");
  const dVariants = document.getElementById("dVariants");
  const dPhotosTitle = document.getElementById("dPhotosTitle");
  const dGallery = document.getElementById("dGallery");
  const dPager = document.getElementById("dPager");
  const dPrev = document.getElementById("dPrev");
  const dNext = document.getElementById("dNext");
  const dPageInfo = document.getElementById("dPageInfo");
  const dGalleryEmpty = document.getElementById("dGalleryEmpty");
  const navBtns = document.querySelectorAll(".nav-btn");

  let APPROVED_CACHE = [];
  let currentView = "home";
  let currentFamily = null;
  let detailPhotos = [];
  let detailPage = 0;
  const DETAIL_PAGE_SIZE = 6;

  async function loadApproved() {
    try {
      const { data, error } = await sb.from("photos").select("*").eq("status", "approved").order("created_at", { ascending: false });
      if (error) throw error;
      APPROVED_CACHE = data || [];
    } catch (e) { APPROVED_CACHE = []; }
  }

  function familyVariantIds(f) { return (f.variants || []).map((v) => v.id); }
  function photosForFamily(f) {
    const ids = familyVariantIds(f);
    return APPROVED_CACHE.filter((p) => ids.indexOf(p.aircraft) >= 0);
  }

  function renderCatalog() {
    if (!catalog) return;
    if (!FAMILIES || !FAMILIES.length) { catalog.innerHTML = ""; return; }
    const groups = [];
    const map = {};
    FAMILIES.forEach((f) => {
      const key = en() ? (f.categoryEn || f.category) : f.category;
      if (!map[key]) { map[key] = []; groups.push(key); }
      map[key].push(f);
    });
    catalog.innerHTML = groups.map((g) => {
      const cards = map[g].map((f) => {
        const ids = familyVariantIds(f);
        const count = APPROVED_CACHE.filter((p) => ids.indexOf(p.aircraft) >= 0).length;
        const name = en() ? (f.nameEn || f.name) : f.name;
        const mfr = en() ? (f.manufacturerEn || f.manufacturer) : f.manufacturer;
        const cty = en() ? (f.countryEn || f.country) : f.country;
        const cat = en() ? (f.categoryEn || f.category) : f.category;
        const desc = en() ? (f.descEn || f.desc || "") : (f.desc || "");
        const countBadge = count > 0 ? `<span class="fam-count">${count}</span>` : "";
        return `<article class="fam-card" data-id="${f.id}" tabindex="0">
            <div class="fam-thumb"><img src="${f.image}" alt="${esc(name)}" loading="lazy" decoding="async" onload="this.classList.add('loaded')" onerror="this.style.display='none'" />${countBadge}</div>
            <div class="fam-body">
              <h3 class="fam-name">${esc(name)}</h3>
              <p class="fam-sub">${esc(mfr)} · ${esc(cty)} · ${esc(cat)}</p>
              <p class="fam-desc">${esc(desc)}</p>
            </div>
          </article>`;
      }).join("");
      return `<section class="cat-group">
          <h2 class="cat-title">${esc(g)}</h2>
          <div class="cat-grid">${cards}</div>
        </section>`;
    }).join("");

    catalog.querySelectorAll(".fam-card").forEach((cardEl) => {
      const f = FAMILIES.find((x) => x.id === cardEl.dataset.id);
      cardEl.addEventListener("click", () => openFamilyDetail(f));
      cardEl.addEventListener("keydown", (e) => { if (e.key === "Enter") openFamilyDetail(f); });
    });
    catalog.querySelectorAll(".fam-thumb img").forEach((im) => { if (im.complete && im.naturalWidth) im.classList.add("loaded"); });
  }

  function openFamilyDetail(f) {
    if (!f) return;
    currentFamily = f;
    const name = en() ? (f.nameEn || f.name) : f.name;
    const mfr = en() ? (f.manufacturerEn || f.manufacturer) : f.manufacturer;
    const cty = en() ? (f.countryEn || f.country) : f.country;
    const cat = en() ? (f.categoryEn || f.category) : f.category;
    dImg.src = f.image; dImg.alt = name; dImg.decoding = "async";
    dImg.onload = function () { this.classList.add("loaded"); };
    dImg.onerror = function () { this.style.display = "none"; };
    if (dImg.complete && dImg.naturalWidth) dImg.classList.add("loaded");
    dImg.style.display = "";
    dName.textContent = name;
    dSub.textContent = mfr + " · " + cty + " · " + cat;
    dDesc.textContent = en() ? (f.descEn || f.desc || "") : (f.desc || "");
    dWiki.href = f.wiki || "#";
    // 子型号
    dVariants.innerHTML = (f.variants || []).map((v) => {
      const vname = en() ? (v.nameEn || v.name) : v.name;
      const vsub = en() ? (v.subEn || v.sub) : v.sub;
      const seats = v.seats || "—";
      const range = v.range || "—";
      const engines = en() ? (v.enginesEn || v.engines) : v.engines;
      return `<div class="variant-card">
          <div class="v-name">${esc(vname)}</div>
          ${vsub ? `<div class="v-sub">${esc(vsub)}</div>` : ""}
          <div class="v-spec"><span>${t("specSeats")}</span><b>${esc(seats)}</b></div>
          <div class="v-spec"><span>${t("specRange")}</span><b>${esc(range)}</b></div>
          ${engines ? `<div class="v-spec"><span>${t("specEngines")}</span><b>${esc(engines)}</b></div>` : ""}
        </div>`;
    }).join("");
    // 照片（按机型归类）
    detailPhotos = photosForFamily(f);
    detailPage = 0;
    dPhotosTitle.textContent = t("photoCount", { n: detailPhotos.length });
    renderDetailGallery();
    showView("detail");
  }

  function renderDetailGallery() {
    const totalPages = Math.max(1, Math.ceil(detailPhotos.length / DETAIL_PAGE_SIZE));
    if (detailPage >= totalPages) detailPage = totalPages - 1;
    if (detailPage < 0) detailPage = 0;
    const start = detailPage * DETAIL_PAGE_SIZE;
    const slice = detailPhotos.slice(start, start + DETAIL_PAGE_SIZE);
    dGallery.innerHTML = "";
    dGalleryEmpty.hidden = detailPhotos.length > 0;
    if (detailPhotos.length === 0) { dPager.hidden = true; return; }
    slice.forEach((p) => dGallery.appendChild(recCard(p)));
    dPager.hidden = totalPages <= 1;
    dPageInfo.textContent = t("pageInfo", { cur: detailPage + 1, total: totalPages });
    dPrev.disabled = detailPage === 0;
    dNext.disabled = detailPage >= totalPages - 1;
  }

  dPrev.addEventListener("click", () => { if (detailPage > 0) { detailPage--; renderDetailGallery(); } });
  dNext.addEventListener("click", () => { detailPage++; renderDetailGallery(); });
  backBtn.addEventListener("click", () => showView("home"));

  function showView(v) {
    currentView = v;
    [viewHome, viewUpload, viewDetail].forEach((s) => { if (s) s.hidden = true; });
    const target = (v === "home" ? viewHome : v === "upload" ? viewUpload : viewDetail);
    if (target) target.hidden = false;
    navBtns.forEach((b) => b.classList.toggle("active", b.dataset.view === v));
    if (v === "upload") {
      if (isDev()) renderHangar();
      renderRecommend();
          } else if (v === "home") {
      renderCatalog();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  navBtns.forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

  /* ============ 初始化 ============ */
  applyI18n();
  // 默认访客模式：每次打开都从「访客」开始，开发者模式需手动登录才进入
  currentUser = null;
  applyDevUI();
  // 清除可能持久化的登录态，避免刷新后自动进入开发者模式
  sb.auth.signOut().catch(() => {});
  // 安全兜底：若浏览器把保存的邮箱误填进了搜索框，立即清空
  if (regSearch && regSearch.value.indexOf("@") >= 0) regSearch.value = "";
  // 载入已通过照片缓存，并默认进入「主页（机型目录）」
  refreshAll().then(() => showView("home"));

  sb.auth.onAuthStateChange((event, session) => {
    // 初始会话（刷新后 Supabase 自动恢复）不自动进入开发者模式 → 保持访客
    if (event === "INITIAL_SESSION") {
      currentUser = null;
      applyDevUI();
      refreshAll().then(() => showView(currentView));
      return;
    }
    currentUser = session?.user ?? null;
    applyDevUI();
    applyI18n();
    refreshAll().then(() => showView(currentView));
  });
})();
