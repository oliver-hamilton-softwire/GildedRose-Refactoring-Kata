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
    item.quality = Math.min(item.quality + 1, 50);
  }

  private updateQualityBackstagePass(item: Item) {
    item.quality += 1
    if (item.sellIn <= 10) {
      item.quality += 1
    }
    if (item.sellIn <= 5) {
      item.quality += 1
    }
    item.quality = Math.min(item.quality, 50);
    item.sellIn -= 1
    // Quality drops to 0 after a concert
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let decrement = 1;
      if (this.items[i].name == 'Conjured') {
        // Conjured items degrade in quality twice as fast as normal items
        decrement *= 2;
      }
      if (this.items[i].name == 'Aged Brie') {
        this.updateQualityAgedBrie(this.items[i]);
      } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateQualityBackstagePass(this.items[i]);
      } else if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // Once sell by date has passed, quality degrades twice as fast
        if (this.items[i].sellIn <= 0) {
         decrement *= 2;
        }
        this.items[i].quality = Math.max(this.items[i].quality - decrement, 0);
        this.items[i].sellIn -= 1;
      }
    }
    return this.items;
  }
}
