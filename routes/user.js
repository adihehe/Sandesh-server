import express from "express"
import { getprofile, login, logOut, register, searchUser,sendFriendRequest,acceptFriendRequest,getMyNotifications,getMyFriends } from "../controllers/user.js";
import { singleAvatar} from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { registerValidator,validateHandler ,loginValidator,sendRequestValidator,acceptRequestValidator} from "../lib/validators.js";
const app = express.Router()

app.post("/new",singleAvatar, registerValidator(), validateHandler,register)
app.post("/login", loginValidator(), validateHandler, login)

app.use(isAuthenticated)
app.get("/profile",getprofile)
app.get("/logout",logOut)
app.get("/search",searchUser)
app.put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
  );
app.put(
    "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
  );
  
  app.get("/notifications", getMyNotifications);

  app.get("/friends", getMyFriends);  
export default app;