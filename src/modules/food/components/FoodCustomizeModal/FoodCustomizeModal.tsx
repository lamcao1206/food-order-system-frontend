import {
  Box,
  Group,
  Stack,
  Text,
  Radio,
  Checkbox,
  Button,
  Divider,
  Avatar,
  Textarea,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import classes from "./FoodCustomizeModal.module.scss";
import {
  Base,
  type ProductFormInput,
  type ProductType,
} from "@/interfaces/food.interface";
import { FoodCategory } from "@/constants/food";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import useCommentStore from "@/lib/zustand/stores/commentStore";
import useUserStore from "@/lib/zustand/stores/useUserStore";

const size9InchImage = "https://dominos.vn/img/icon/pizza-size-2.png";
const size12InchImage = "https://dominos.vn/img/icon/pizza-size-2.png";

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
  const isPizza = product.category === FoodCategory.PIZZA;
  const { t } = useTranslation("food");

  const baseOptions = [
    {
      label: Base.THIN,
      price: 0,
      image: "https://dominos.vn/img/icon/pizza-base-1.png",
    },
    {
      label: Base.MEDIUM,
      price: 0,
      image: "https://dominos.vn/img/icon/pizza-base-2.png",
    },
    {
      label: Base.THICK,
      price: 0,
      image: "https://dominos.vn/img/icon/pizza-base-3.png",
    },
  ];

  const sizeOptions = useMemo(() => {
    if (!isPizza || !product.type) return [];
    return (product.type as Array<ProductType>).map((prod) => ({
      label: `Size ${prod?.size} inch`,
      price: prod?.price * 1000,
      image: prod?.size === 9 ? size9InchImage : size12InchImage,
    }));
  }, [isPizza, product.type]);

  const extraToppingList = useMemo(
    () => [
      {
        label: 'Add Cheese 9"',
        price: 35000,
        image: "https://img.dominos.vn/1phomai-v.png",
      },
      {
        label: 'Double Cheese 9"',
        price: 65000,
        image: "https://img.dominos.vn/2phomai-v.png",
      },
      {
        label: 'Triple Cheese 9"',
        price: 95000,
        image: "https://img.dominos.vn/3phomai-v.png",
      },
    ],
    []
  );

  const crustOptions = useMemo(
    () => [
      {
        label: '9" Cheese Ring',
        price: 69000,
        image: "https://img.dominos.vn/phomai.png",
      },
      {
        label: '9" Cheese Sausage',
        price: 69000,
        image: "https://img.dominos.vn/xucxic.png",
      },
      {
        label: '9" Cheese Sausage Ring',
        price: 99000,
        image: "https://img.dominos.vn/phomaixucxich.png",
      },
    ],
    []
  );

  const [selectedBase, setSelectedBase] = useState<string>(
    baseOptions[0].label
  );
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.label || "");
  const [selectedCrust, setSelectedCrust] = useState("");
  const [selectedExtraTopping, setSelectedExtraTopping] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore((state) => state.actions);
  const comments = useCommentStore((state) => state.data);
  const { addComment } = useCommentStore((state) => state.actions);
  const totalPrice = useMemo(() => {
    let basePrice = 0;

    if (sizeOptions.length > 0) {
      // Pizza
      basePrice =
        sizeOptions.find((opt) => opt.label === selectedSize)?.price || 0;
    } else if (product.type && !Array.isArray(product.type)) {
      // Non-Pizza
      basePrice = ((product.type as { price: number }).price || 0) * 1000;
    }

    if (selectedCrust) {
      basePrice +=
        crustOptions.find((opt) => opt.label === selectedCrust)?.price || 0;
    }

    if (selectedExtraTopping) {
      basePrice +=
        extraToppingList.find((opt) => opt.label === selectedExtraTopping)
          ?.price || 0;
    }

    return basePrice * quantity;
  }, [
    sizeOptions,
    selectedSize,
    selectedCrust,
    selectedExtraTopping,
    quantity,
    crustOptions,
    extraToppingList,
    product.type,
  ]);
  const [newComment, setNewComment] = useState("");
  const currentUser = useUserStore((state) => state.user);
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(
      product.id,
      { id: currentUser?.id ?? "1", name: currentUser?.name ?? "" },
      newComment.trim()
    );

    setNewComment("");
  };
  const userHasCommented = comments
    .filter((c) => c.foodId === product.id)
    .flatMap((c) => c.comments)
    .some((c) => c.user.id === currentUser?.id);

  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Math.floor(totalPrice / quantity),
      quantity,
      ...(isPizza
        ? {
            base: selectedBase as Base,
            additionalCheese: selectedExtraTopping ?? "",
            additionalCrust: selectedCrust ?? "",
            size: selectedSize.includes("9") ? 9 : 12,
          }
        : {}),
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
            background: "red",
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
            {product.category === FoodCategory.PIZZA && (
              <>
                <Box className={classes.optionGroup}>
                  <Text component="h3">
                    {t("customizeModal.chooseBaseOption")}
                  </Text>
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
                  <Text component="h3">{t("customizeModal.selectSize")}</Text>
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
                  <Text component="h3">{t("customizeModal.extraTopping")}</Text>
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
                  <Text component="h3">{t("customizeModal.crustOption")}</Text>
                  <Radio.Group
                    value={selectedCrust}
                    onChange={setSelectedCrust}
                  >
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
              </>
            )}
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
                {t("customizeModal.addToCart")}{" "}
                {totalPrice.toLocaleString("vi-VN")}đ
              </Button>
            </Group>
          </Box>
        </Box>
        <Box className={classes.commentSection}>
          <Text className={classes.commentTitle}>
            {t("customizeModal.comment")}
          </Text>

          <Box className={classes.commentList}>
            {comments
              .filter((c) => c.foodId === product.id)
              .flatMap((c) => c.comments)
              .map((c, idx) => (
                <Box key={idx} className={classes.commentItem}>
                  <Box className={classes.commentRow}>
                    <Avatar size={30} radius="xl">
                      {c.user.name[0]}
                    </Avatar>

                    <Text className={classes.userName}>{c.user.name}</Text>
                  </Box>
                  <Text className={classes.commentText}>{c.text}</Text>
                </Box>
              ))}
          </Box>
          <Box className={classes.commentInputSection} mt="sm">
            <Textarea
              placeholder={t("customizeModal.writeComment")}
              minRows={2}
              maxRows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
              styles={{ input: { fontSize: 14 } }}
              disabled={userHasCommented}
            />
            <Button
              mt="xs"
              size="sm"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              {t("customizeModal.send")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCustomizenModal;
