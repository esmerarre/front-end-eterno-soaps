export default function AdminSignIn() {
    return (
        <section className="admin-signin">
            <div className="signin-container">
                <h2 className="signin-title">Admin Sign In</h2>
                <p className="signin-subtitle">Please enter your credentials to access the admin dashboard.</p>
                <form className="signin-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <button type="submit" className="btn-submit">Sign In</button>
                </form>
            </div>
        </section>

    );
};