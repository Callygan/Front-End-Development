import { router } from ".router.js";

router();

window.addEventListener("popstate", router);