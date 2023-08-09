const fs = require("fs")

const getJSONFromBuffer = (_filename, _default = {}) => {
  try {
    const db = fs.readFileSync(_filename)
    return JSON.parse(db)
  } catch (err) {
    return _default
  }
}
const MStorage = (
  context = "default",
  fileName = `${__dirname}/.cart.json`
) => {
  const data = getJSONFromBuffer(fileName)

  const write = _data => {
    try {
      fs.writeFileSync(fileName, JSON.stringify(_data, null, 2))
      return {
        status: true,
        data: _data[context]
      }
    } catch (err) {
      return {
        status: false,
        data: _data[context]
      }
    }
  }

  return {
    save: (key, value) => {
      if (!data[context]) {
        data[context] = {}
      }
      data[context][key] = value
      return write(data)
    },
    read: key => {
      try {
        return data[context][key]
      } catch (err) {
        return ""
      }
    },
    clear: () => {
      data[context] = {}
      return write(data)
    }
  }
}

module.exports = MStorage
