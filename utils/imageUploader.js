const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

// ===== saves on disk
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid image type', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImageFiles = (type, field) => {
  if (type === 'fields') {
    return upload.fields(field); // works for .fields type
  }

  return upload[type](field); // works best with .single and .array type
};

exports.imageProcessor = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.tourImageProcessor = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // for imageCover
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // for images(multiple images)
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const imageFile = `tour-${req.params.id}-${Date.now()}-image-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${imageFile}`);

      req.body.images.push(imageFile);
    }),
  );

  next();
});
