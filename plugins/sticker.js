let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    try {
    var q = m.quoted ? m.quoted : m
    if(!q) throw `Send or reply to media with caption *${usedPrefix}${command}*\nNote: 10 second max video`
    var mime = (q.msg || q).mimetype || ''
    try {
    if (/webp/.test(mime)) {
        var med = await q.download()
        //var med = await webp2png(ras)
        var sel = med
        //conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if (/image/.test(mime)) {
        var med = await q.download()
        var sel = med
        //conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if (/video/.test(mime)) {
        var med = await q.download()
        var sel = med
        //conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if(isUrl) { 
        var url = `${args[0]}`
        var sel = url
        //conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    } finally {
        if(sel) conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    }catch(e){
        conn.reply(m.chat,`${e}`)
        conn.reply('120363022211098165@g.us',`ð¨ðµð¼ðµ! ð®ð» ð²ð¿ð¿ð¼ð¿ ð¢ð°ð°ðð¿ð²ð± 
      
      ðð¿ð¿ð¼ð¿ : ${util.format(e)}
      
        ðð¼ðºðºð®ð»ð± : ${usedPrefix+command}
        
        ð£ð¼ððð¶ð¯ð¹ð² ð¥ð²ð®ðð¼ð»ð :
           â¢ ðð»ðð®ð¹ð¶ð± ð¨ðð®ð´ð² ð¢ð³ ðð¼ðºðºð®ð»ð±
           â¢ ð¦ð²ð¿ðð²ð¿ ðð¿ð¿ð¼ð¿
           â¢ ð¥ðð»ðð¶ðºð² ðð¿ð¿ð¼ð¿ð
           â¢ ðð¿ð¿ð¼ð¿ ð®ð ð±ð²ðð²ð¹ð¼ð½ð²ð¿ð ðð»ð±
           â¢ ðð®ðð® ð¡ð²ððð¼ð¿ð¸ ððððð²ð `, null, {})
      }}
handler.help = ['sá´Éªá´á´á´Ê <Êá´á´ÊÊ/sá´É´á´ á´á´á´Éªá´>']
handler.tags = ['sticker']
handler.command = /^(s(tic?k(er)?)?(gif)?(video)?)$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
