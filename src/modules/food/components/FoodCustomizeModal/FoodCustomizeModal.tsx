import {
  Box,
  Group,
  Stack,
  Text,
  Radio,
  Checkbox,
  Button,
  Divider,
} from "@mantine/core";
import { useState, useMemo } from "react";
import classes from "./FoodCustomizeModal.module.scss";
import { Base, type ProductFormInput } from "@/interfaces/food.interface";
import useCartStore from "@/lib/zustand/stores/useCartStore";

const size9InchImage = "pizza-9inch.png";
const size12InchImage = "pizza-12inch.png";

const CustomOption = ({
  label,
  price,
  image,
  type,
  checked,
  onChange,
  value,
}: any) => {
  const OptionComponent = type === "radio" ? Radio : Checkbox;

  return (
    <Group
      justify="space-between"
      align="center"
      className={classes.customOptionItem}
    >
      <OptionComponent
        label={<Text className={classes.optionText}>{label}</Text>}
        checked={checked}
        onChange={onChange}
        value={value || label}
      />
      <Group gap="xs" align="center">
        {price && price > 0 && (
          <Text className={classes.optionPrice}>
            {price.toLocaleString("vi-VN")}đ
          </Text>
        )}
        {image && (
          <img src={image} alt={label} className={classes.optionImage} />
        )}
      </Group>
    </Group>
  );
};

interface FoodCustomizeModalProps {
  opened: boolean;
  onClose: () => void;
  product: ProductFormInput;
}

const ProductCustomizenModal = ({
  opened,
  onClose,
  product,
}: FoodCustomizeModalProps) => {
  const baseOptions = [
    { label: Base.THIN, price: 0, image: "base-thick.png" },
    { label: Base.MEDIUM, price: 0, image: "base-medium.png" },
    { label: Base.THICK, price: 0, image: "base-thin.png" },
  ];

  const sizeOptions = product.type?.map((prod) => ({
    label: `Size ${prod?.size} inch`,
    price: prod?.price * 1000,
    image: prod?.size === 9 ? size9InchImage : size12InchImage,
  }));

  const extraToppingList = useMemo(
    () => [
      { label: 'Add Cheese 9"', price: 35000, image: "cheese-small.png" },
      { label: 'Double Cheese 9"', price: 65000, image: "cheese-medium.png" },
      { label: 'Triple Cheese 9"', price: 95000, image: "cheese-large.png" },
    ],
    []
  );

  const crustOptions = useMemo(
    () => [
      { label: '9" Cheese Ring', price: 69000, image: "crust-cheese.png" },
      { label: '9" Cheese Sausage', price: 69000, image: "crust-sausage.png" },
      {
        label: '9" Cheese Sausage Ring',
        price: 99000,
        image: "crust-sausage-cheese.png",
      },
    ],
    []
  );

  const [selectedBase, setSelectedBase] = useState<string>(
    baseOptions[0].label
  );
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].label);
  const [selectedCrust, setSelectedCrust] = useState("");
  const [selectedExtraTopping, setSelectedExtraTopping] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore((state) => state.actions);

  const totalPrice = useMemo(() => {
    let price =
      sizeOptions.find((opt) => opt.label === selectedSize)?.price || 0;
    if (selectedCrust)
      price +=
        crustOptions.find((opt) => opt.label === selectedCrust)?.price || 0;
    if (selectedExtraTopping)
      price +=
        extraToppingList.find((opt) => opt.label === selectedExtraTopping)
          ?.price || 0;
    return price * quantity;
  }, [
    selectedSize,
    selectedCrust,
    selectedExtraTopping,
    quantity,
    sizeOptions,
    crustOptions,
    extraToppingList,
  ]);

  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize.includes("9") ? 9 : 12,
      price: totalPrice,
      quantity,
      base: selectedBase as Base,
      additionalCheese: selectedExtraTopping ?? "",
      additionalCrust: selectedCrust ?? "",
    });
    onClose();
  };

  if (!opened) return null;

  return (
    <Box className={classes.modalOverlay}>
      <Box className={classes.modalContainer}>
        <Button
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 20,
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            minWidth: "auto",
            fontSize: "20px",
            borderRadius: "8px",
            background: "red"
          }}
          onClick={() => onClose()}
        >
          X
        </Button>

        <Box
          className={classes.imageSection}
          style={{ backgroundImage: `url(${product.image})` }}
        />

        <Box className={classes.contentSection}>
          <Stack gap="sm" className={classes.contentScroll}>
            <Text className={classes.productTitle}>{product.name}</Text>
            <Text className={classes.productDescription}>
              {product.description}
            </Text>
            <Divider my="sm" />

            <Box className={classes.optionGroup}>
              <Text component="h3">Choose base option</Text>
              <Radio.Group value={selectedBase} onChange={setSelectedBase}>
                <Stack gap={0}>
                  {baseOptions.map((opt) => (
                    <CustomOption
                      key={opt.label}
                      label={opt.label}
                      image={opt.image}
                      type="radio"
                    />
                  ))}
                </Stack>
              </Radio.Group>
            </Box>

            <Box className={classes.optionGroup}>
              <Text component="h3">Select size</Text>
              <Radio.Group value={selectedSize} onChange={setSelectedSize}>
                <Stack gap={0}>
                  {sizeOptions.map((opt) => (
                    <CustomOption
                      key={opt.label}
                      label={opt.label}
                      price={opt.price}
                      image={opt.image}
                      type="radio"
                    />
                  ))}
                </Stack>
              </Radio.Group>
            </Box>

            <Box className={classes.optionGroup}>
              <Text component="h3">Extra topping</Text>
              <Radio.Group
                value={selectedExtraTopping}
                onChange={setSelectedExtraTopping}
              >
                <Stack gap={0}>
                  {extraToppingList.map((opt) => (
                    <CustomOption
                      key={opt.label}
                      label={opt.label}
                      price={opt.price}
                      image={opt.image}
                      type="radio"
                      checked={selectedExtraTopping === opt.label}
                      onChange={() => setSelectedExtraTopping(opt.label)}
                    />
                  ))}
                </Stack>
              </Radio.Group>
            </Box>

            <Box className={classes.optionGroup}>
              <Text component="h3">Crust option</Text>
              <Radio.Group value={selectedCrust} onChange={setSelectedCrust}>
                <Stack gap={0}>
                  {crustOptions.map((opt) => (
                    <CustomOption
                      key={opt.label}
                      label={opt.label}
                      price={opt.price}
                      image={opt.image}
                      type="radio"
                    />
                  ))}
                </Stack>
              </Radio.Group>
            </Box>
          </Stack>

          <Box className={classes.modalFooter}>
            <Group justify="space-between" align="center">
              <Group gap={0}>
                <Button
                  className={classes.quantityButton}
                  onClick={() => handleQuantityChange(-1)}
                  variant="default"
                >
                  -
                </Button>
                <Box className={classes.quantityDisplay}>{quantity}</Box>
                <Button
                  className={classes.quantityButton}
                  onClick={() => handleQuantityChange(1)}
                  variant="default"
                >
                  +
                </Button>
              </Group>
              <Button
                size="md"
                className={classes.addButton}
                onClick={handleAddToCart}
              >
                Add to cart {totalPrice.toLocaleString("vi-VN")}đ
              </Button>
            </Group>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCustomizenModal;
