export default function useMobileConsole() {
  if (process.env.NODE_ENV === "development") {
    const eruda = document.getElementById("eruda");
    if (!eruda) {
      const script = document.getElementById("script");
      const erudaScript = document.createElement("script");
      erudaScript.id = "eruda";
      erudaScript.src = "//cdn.jsdelivr.net/npm/eruda";
      script!.appendChild(erudaScript);
      erudaScript.onload = function () {
        const init = document.getElementById("init");
        if (!init) {
          const script = document.getElementById("script");
          const scriptEruda = document.createElement("script");
          scriptEruda.id = "init";
          scriptEruda.innerHTML = "eruda.init();";
          script!.appendChild(scriptEruda);
        }
      };
    }
  }
}
