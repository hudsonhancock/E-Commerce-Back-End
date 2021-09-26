const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        Tag_name: req.body.Tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
