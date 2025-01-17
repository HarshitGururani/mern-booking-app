import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImage = watch("imageUrls") || [];

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      existingImage.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-secondary-foreground mb-4">
        Images
      </h2>

      <div className="border rounded flex flex-col gap-4">
        {existingImage && (
          <div className="grid grid-cols-5 gap-4 mt-6">
            {existingImage.map((src, index) => (
              <div
                key={index}
                className="w-full h-32 border rounded overflow-hidden relative group"
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />

                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(event) => handleDelete(event, src)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          multiple
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImage?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <p className="text-sm font-bold text-destructive">
          {errors.imageFiles.message}
        </p>
      )}
    </div>
  );
};
export default ImageSection;
