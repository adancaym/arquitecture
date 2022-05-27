import {success, notFound} from '../../services/response/'
import {File} from '.'

const path = require('path')
var multiparty = require('multiparty')
var fs = require('fs')
var mime = require('mime')


const pathToUploads = './uploads/'

const fileInfo = (pathToFile) => {
  return {
    file: pathToFile,
    ext: path.extname(pathToFile),
    pathToFile: pathToUploads,
    name: path.basename(pathToFile),
    size: fs.statSync(pathToFile).size,
    mime: mime.getType(pathToFile)
  }
}




export const create = ({bodymen: {body}}, res, next) =>
  File.create(body)
    .then((file) => file.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  File.find(query, select, cursor)
    .then((files) => files.map((file) => file.view()))
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  File.findById(params.id)
    .then(notFound(res))
    .then((file) => file ? file.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({bodymen: {body}, params}, res, next) =>
  File.findById(params.id)
    .then(notFound(res))
    .then((file) => file ? Object.assign(file, body).save() : null)
    .then((file) => file ? file.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({params}, res, next) =>
  File.findById(params.id)
    .then(notFound(res))
    .then((file) => file ? file.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const upload = (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    const oldPath = files.file[0].path;
    const readStream = fs.createReadStream(oldPath);
    const pathFolderUser = pathToUploads + '/'
    if (!fs.existsSync(pathFolderUser)) {
      fs.mkdirSync(pathFolderUser)
    }
    let newPath = pathFolderUser + files.file[0].originalFilename
    newPath = path.resolve(newPath)
    const writeStream = fs.createWriteStream(newPath)
    readStream.pipe(writeStream)
    readStream.on('end', () => {
      const fileInformation = fileInfo(newPath)
      File.create(fileInformation)
        .then((file) => file.view(true))
        .then(success(res, 201))
        .catch(next)
    })
  })
}
export const download = (req, res, next) => {
  try {
    File.findById(req.params.id)
      .then((file) => file.view(true))
      .then((file) => {
        if (!fs.existsSync(path.dirname(file.file))) {
          fs.mkdirSync(path.dirname(file.file))
        }
        if (fs.existsSync(file.file)) {
          res.sendfile(file.file)
        } else {
          res.sendfile(file.file)
        }
      })
      .catch(next)
  } catch (error) {
    res.status(500).json(error)
  }
}
