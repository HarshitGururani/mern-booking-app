import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth";
import Hotel from "../models/hotels";
import { addHotelValidation } from "../validatiors/addHotelValidation";
import { HotelType } from "../shared/types";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

const uploadImage = async (imageFiles: Express.Multer.File[]) => {
  const uplaodPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uplaodPromises);
  return imageUrls;
};

router.post(
  "/",
  verifyToken,
  addHotelValidation,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. upload the images to cloudinary

      const imageUrls = await uploadImage(imageFiles);

      //2 if uplaod was successful, add the URLs to the new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      return res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotel:", error);
      res.status(500).json({ message: "Something went wrrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels " });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    return res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching hotel details" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const upadatedHotel: HotelType = req.body;
      upadatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        upadatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files as Express.Multer.File[];

      const updatedImageUrls = await uploadImage(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(upadatedHotel.imageUrls || []),
      ];

      await hotel.save();
      return res.status(201).json(hotel);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrrong" });
    }
  }
);

export default router;
