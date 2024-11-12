exports = async function(email) {
    try {
        await context.functions.execute("auth.sendResetPasswordEmail", email);
        return { status: "success", message: "Password reset email sent." };
    } catch (error) {
        console.error("Error sending password reset email:", error);
        return { status: "error", message: "Failed to send password reset email." };
    }
};
