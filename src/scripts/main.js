import { files } from "./data/file-items.js";
import { renderFileTree, setupFileTreeEvents } from "./file-tree.js";
import { renderTabs } from "./tabs-bar.js";
import {setupHeaderButtonsEvents} from "./header.js"
renderFileTree(files);
renderTabs(files);
setupFileTreeEvents(files);
setupHeaderButtonsEvents();
