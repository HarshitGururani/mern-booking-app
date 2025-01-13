import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { useState } from "react";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const [imagesPriview, setImagesPriview] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagesPriview(previews);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl text-secondary-foreground mb-4">
        Images
      </h2>

      <div className="border rounded flex flex-col gap-4">
        <input
          type="file"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength === 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
          onChange={(event) => {
            register("imageFiles").onChange(event);
            handleImageChange(event);
          }}
        />
        {errors.imageFiles && (
          <p className="text-sm font-bold text-destructive">
            {errors.imageFiles.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {imagesPriview.map((src, index) => (
          <div
            key={index}
            className="w-full h-32 border rounded overflow-hidden"
          >
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageSection;
