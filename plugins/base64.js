let handler = async (m, { text }) => {
  let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text
  conn.reply(m.chat,Buffer.from(txt, 'utf-8').toString('base64'))
}
handler.help = ['ʙᴀsᴇ64 <ᴛᴇxᴛ>']
handler.tags = ['tools']
handler.command = /^base64$/i

module.exports = handler
