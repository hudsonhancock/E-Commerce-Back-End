const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Category, through: Product, as: "product" }],
    });

    if (!oneCategoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(oneCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
