type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        className="p-2 border rounded w-full"
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value={""}>Select Max Price</option>
        {[12450, 8500, 4501, 3000, 2000, 1000].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};
export default PriceFilter;
