exports = async function(resetToken, newPassword) {
    try {
        const auth = context.services.get("auth");
        
        await auth.resetPassword(resetToken, newPassword);

        return { status: "success", message: "Password reset successful." };
    } catch (error) {
        console.error("Error resetting password:", error);
        return { status: "error", message: "Password reset failed." };
    }
};
