export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private updateQualityAgedBrie(item: Item) {
    item.sellIn -= 1
    item.quality = Math.max(item.quality + 1, 50);
  }

  private updateQualityBackstagePass(item: Item) {
    item.quality += 1
    if (item.sellIn <= 10) {
      item.quality += 1
    }
    if (item.sellIn <= 5) {
      item.quality += 1
    }
    item.quality = Math.max(item.quality, 50);
    item.sellIn -= 1
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == 'Aged Brie') {
        this.updateQualityAgedBrie(this.items[i]);
      } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateQualityBackstagePass(this.items[i]);
      } else if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // Once sell by date has passed, quality degrades twice as fast
        if (this.items[i].sellIn <= 0) {
          this.items[i].quality = Math.max(this.items[i].quality - 1, 0);
        }
        this.items[i].quality = Math.max(this.items[i].quality - 1, 0);
        this.items[i].sellIn -= 1;
      }

      //   if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //     if (this.items[i].quality > 0) {
      //       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //         this.items[i].quality = this.items[i].quality - 1
      //       }
      //     }
      //   } else {
      //     if (this.items[i].quality < 50) {
      //       this.items[i].quality = this.items[i].quality + 1
      //       if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
      //         if (this.items[i].sellIn < 11) {
      //           if (this.items[i].quality < 50) {
      //             this.items[i].quality = this.items[i].quality + 1
      //           }
      //         }
      //         if (this.items[i].sellIn < 6) {
      //           if (this.items[i].quality < 50) {
      //             this.items[i].quality = this.items[i].quality + 1
      //           }
      //         }
      //       }
      //     }
      //   }
      //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //     this.items[i].sellIn = this.items[i].sellIn - 1;
      //   }
      //   if (this.items[i].sellIn < 0) {
      //     if (this.items[i].name != 'Aged Brie') {
      //       if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //         if (this.items[i].quality > 0) {
      //           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //             this.items[i].quality = this.items[i].quality - 1
      //           }
      //         }
      //       } else {
      //         this.items[i].quality = this.items[i].quality - this.items[i].quality
      //       }
      //     } else {
      //       if (this.items[i].quality < 50) {
      //         this.items[i].quality = this.items[i].quality + 1
      //       }
      //     }
      //   }
      // }
    }

    return this.items;
  }
}
