import { files } from "./data/file-items.js";
import { renderFileTree, setupFileTreeEvents, updateActiveStates } from "./file-tree.js";
import { renderTabs, setupTabBarEvents } from "./tabs-bar.js";
import {setupHeaderButtonsEvents} from "./header.js"

renderFileTree(files);
renderTabs(files);
setupFileTreeEvents(files);
setupTabBarEvents(files);
setupHeaderButtonsEvents();

// Set initial active states
setTimeout(() => updateActiveStates(), 100);