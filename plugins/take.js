let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { usedPrefix,command, conn }) => {
   try {  
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    if(sel) await conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
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
  } }

handler.help = ['á´á´á´á´ <Êá´á´ÊÊ sá´Éªá´á´á´Ê>']
handler.tags = ['owner']
handler.command = /^(take)$/i
handler.owner = true
module.exports = handler
