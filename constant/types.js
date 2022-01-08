const MSG_TYPES = Object.freeze({
    ACCOUNT_CREATED: "Account Successfully Created.",
    ACCOUNT_EXIST: "Account already exist.",
    LOGGED_IN: "Successfully logged in",
    EXIST: "Already exist.",
    DELETED: "Resource Deleted Successfully",
    UPDATED: "Resource Updated Successfully",
    CREATED: "Resource Created Successfully",
    FETCHED: "Resource Fetched Successfully",
    ACCOUNT_VERIFIED: "Account Successfully Verified",
    ACCOUNT_INVALID: "Invalid email or password",
    ACCOUNT_HASVERIFIED: "Account has been Verified",
    ACCOUNT_NOTVERIFIED: "Account is not verified!",
    ACCOUNT_NOTGRANTED: "Account has not been granted access!",
    ACCOUNT_GRANTED: "Account has been granted access!",
    SUSPENDED: "Account is suspended!",
    INACTIVE: "Account is inactive!",
    DISABLED: "Account is disabled!",
    ACCOUNT_UNVERIFIED: "Account is unverified!",
    ACCOUNT_TERMINATED: "Account has been terminated!",
    NOT_FOUND: "Not Found",
    PERMISSION: "You don't have enough permission to perform this action",
    SERVER_ERROR: "Server Error!",
    INVALID_PASSWORD: "Invalid Password",
    INVALID_ANSWER: "Invalid Answer",
    SENT: "Email Sent",
    DOCUMENT_REQUIRED:"Documents/images are required"
});
  
  
const USER_STATUS = {
    ACTIVE: "active",
    SUSPENDED: "suspended"
}
  
module.exports = {
    MSG_TYPES,
    USER_STATUS
};
  