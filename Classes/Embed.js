const { prefix } = require('../config.json');
const colors = { "success": 8311585, "error": 15609652, "warning": "#f0d000", "default": "#6a1b9a" };
const emojis = { "check": "✅", "cross": "❌", "warning": "⚠️", "question": "❓" };

module.exports = {
    linkGuild() {
        return {
            'embed': {
                'title': 'Setup Guild',
                'description': `How to link your account and start your TINY Adventure!!

\`\`\`md
1. Go to https://account.arena.net/applications/create
2. Choose a fitting name for the key
3. Make sure to select "account" and "characters"
4. Click Create API Key
5. Send me the key using the format  ${prefix}key your-api-key
\`\`\`
If you are not in [TINY] and are here just for the shenanigans or to hang out, feel free to ignore this (until you inevitably create an Asura and join us)`,
                'color': colors.default
            }
        }
    },
    linkSuccess(dAccount, gAccount) {
        return {
            'embed': {
                'description': `${emojis.check} Successfully linked ${dAccount} to ${gAccount}`,
                "color": colors.success
            }
        }
    }
}