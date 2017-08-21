class ItemController {
  constructor(Item) {
    this.Item = Item;
  }

  getName(data) {
    return this.Item.findAll({ where: { name:
                                        { $like:
                                          { $any: this.ItensWillBeRegistered(data) },
                                        },
    },
    })
      .then(result => result)
      .error(error => error.message);
  }

  ItensWillBeRegistered(items) {
    this.itensName = [];
    for (let i = 0; i < items.length; i += 1) {
      this.itensName.push(items[i].name);
    }

    return this.itensName;
  }
}
export default ItemController;
