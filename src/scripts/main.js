import { files } from "./data/file-items.js";
import { renderFileTree, setupFileTreeEvents } from "./file-tree.js";
import { renderTabs } from "./tabs-bar.js";

renderFileTree(files);
renderTabs(files);
setupFileTreeEvents(files);

