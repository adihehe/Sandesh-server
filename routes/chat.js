import express from "express"
import { getMyChats, newGroupChat,getMyGroups,addMembers,removeMember,leaveGroup, sendAttachments,getChatDetails,renameGroup,deleteChat,getMessages } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
const app = express.Router()


app.use(isAuthenticated)
app.post('/new', newGroupValidator(), validateHandler,newGroupChat);
app.get('/my',getMyChats)
app.get('/my/group',getMyGroups)
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put("/removemember", removeMemberValidator(), validateHandler, removeMember);
app.delete("/leave/:id",  chatIdValidator(), validateHandler, leaveGroup);
app.post(
    "/message",
    attachmentsMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
  );

// Get Chat Details, rename,delete
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler,getChatDetails)
  .put(renameValidator(), validateHandler,  renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);
export default app;


app.get("/message/:id",chatIdValidator(), validateHandler, getMessages);