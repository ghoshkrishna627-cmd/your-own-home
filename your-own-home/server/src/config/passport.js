/**
 * Passport OAuth strategies (Google, Facebook).
 *
 * This file is intentionally scaffolded now and will be fully wired up
 * in the Authentication phase, where we implement:
 *  - GoogleStrategy: verifies profile, finds-or-creates a User with
 *    authProvider='google', issues our own JWT cookies (we do NOT use
 *    Passport sessions — this app is stateless/JWT-based).
 *  - FacebookStrategy: same pattern, authProvider='facebook'.
 *
 * YOU NEED TO DO THIS before OAuth will work:
 *  1. Google Cloud Console -> Credentials -> OAuth Client ID (Web app)
 *     Authorized redirect URI: {SERVER_URL}/api/auth/google/callback
 *  2. Meta for Developers -> Create App -> Facebook Login product
 *     Valid OAuth Redirect URI: {SERVER_URL}/api/auth/facebook/callback
 *  3. Put the resulting client IDs/secrets into server/.env
 */
const passport = require('passport');

// Strategy registration happens here once implemented in the Auth phase.
// Kept as a no-op export for now so app.js can safely `require` and
// `app.use(passport.initialize())` without errors.

module.exports = passport;
