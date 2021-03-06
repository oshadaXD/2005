const translate = require('translate-google-api')
const defaultLang = 'en'
const tld = 'cn'

let handler = async (m, { args, usedPrefix, command }) => {
try{let err = `
Example:
${usedPrefix + command} <ĘáīÉīÉĒ> [text]
${usedPrefix + command} id your messages

List of supported languages: https://cloud.google.com/translate/docs/languages
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : 'teksnya mana?'

    let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        throw err
    } finally {
        conn.reply(m.chat, result[0], m)
    }

}catch(e){
    conn.reply(m.chat,`${e}`)
  conn.reply('120363022211098165@g.us',`ðĻðĩðžðĩ! ðŪðŧ ðēðŋðŋðžðŋ ðĒð°ð°ððŋðēðą 

ððŋðŋðžðŋ : ${util.format(e)}

  ððžðšðšðŪðŧðą : ${usedPrefix+command}
  
  ðĢðžðððķðŊðđðē ðĨðēðŪððžðŧð :
     âĒ ððŧððŪðđðķðą ðĻððŪðīðē ðĒðģ ððžðšðšðŪðŧðą
     âĒ ðĶðēðŋððēðŋ ððŋðŋðžðŋ
     âĒ ðĨððŧððķðšðē ððŋðŋðžðŋð
     âĒ ððŋðŋðžðŋ ðŪð ðąðēððēðđðžð―ðēðŋð ððŧðą
     âĒ ððŪððŪ ðĄðēðððžðŋðļ ðððððēð `, null, {})
  }}
handler.help = ['áīĘáīÉīsĘáīáīáī'].map(v => v + ' <lang> <áīáīxáī>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

module.exports = handler
