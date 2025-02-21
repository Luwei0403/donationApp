import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      name: 'Solar-powered lantern',
      description:
        'A lantern powered by solar energy, providing a sustainable and eco-friendly source of light to those in need.',
      image:
        'https://assets.wfcdn.com/im/78012299/resize-h800-w800%5Ecompr-r85/3003/300333277/6.18%27%27+Solar+Powered+Integrated+LED+Outdoor+Lantern.jpg',
      donationItemId: 1,
      categoryIds: [1, 2],
      price: '12.34',
    },
    {
      name: 'School supplies kit',
      description:
        'A kit containing all the essential school supplies, such as notebooks, pencils, and erasers, for underprivileged children to help them succeed in their education.',
      image:
        'https://www.raymondgeddes.com/cdn/shop/articles/BacktoSchoolKit.jpg?v=1682075816',
      donationItemId: 2,
      categoryIds: [1, 3],
      price: '8.08',
    },
    {
      name: 'Warm winter coat',
      description:
        'A warm winter coat to protect people from the cold and help them stay warm during the winter months.',
      image:
        'https://bklb.com.tw/cdn/shop/products/1_ca79e6bd-1848-4cab-8f5f-7b9d2ad35e1d.jpg?v=1659062251',
      donationItemId: 3,
      categoryIds: [4],
      price: '42.99',
    },
    {
      name: 'Household cleaning supplies',
      description:
        'Household cleaning supplies, such as soap, sponges, and disinfectant, to help people maintain a clean and healthy living environment.',
      image:
        'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2012/9/11/3/RX-HGMAG005_Clean-House-Confessions-034-e_s4x3.jpg.rend.hgtvcom.1280.960.85.suffix/1400977682672.webp',
      donationItemId: 4,
      categoryIds: [1, 5],
      price: '7.66',
    },
    {
      name: 'Laptops for students',
      description:
        'Laptops for underprivileged students to help them access technology and participate in virtual learning.',
      image:
        'https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsforcollege-2048px-3664-3x2-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200',
      donationItemId: 5,
      categoryIds: [6, 3],
      price: '649.99',
    },
    {
      name: 'Board games',
      description:
        'Board games for families and children to play and enjoy together, promoting social interaction and entertainment.',
      image: 'https://m.media-amazon.com/images/I/813J0DBqCTL.jpg',
      donationItemId: 6,
      categoryIds: [7],
      price: '15.49',
    },
    {
      name: 'Basketballs',
      description:
        'Basketballs for children to play and stay active, promoting physical fitness and exercise.',
      image:
        'https://gophersport.com/media/catalog/product/g/-/g-60185-wilsonevonxt-16.jpg?optimize=low&bg-color=255,255,255&fit=bounds&height=744&width=744&canvas=744:744',
      donationItemId: 7,
      categoryIds: [8],
      price: '12.00',
    },
    {
      name: "Children's books",
      description:
        'Children’s books to promote literacy and encourage a love for reading in young children.',
      image:
        'https://www.thebookbundler.com/cdn/shop/products/bulk-books-large-illustrated-hardcover-kids-books-br-ages-4-8-thebookbundler-14674099667038.jpg?v=1684848476&width=1946',
      donationItemId: 8,
      categoryIds: [1, 9],
      price: '8.49',
    },
    {
      name: 'Hygiene kit',
      description:
        'A hygiene kit containing essential items such as toothbrushes, toothpaste, and soap to help people maintain personal hygiene and health.',
      image: 'https://www.positivepromotions.com/images/1000/MKV-156.webp?v=1',
      donationItemId: 9,
      categoryIds: [10],
      price: '20.49',
    },
    {
      name: 'Office furniture',
      description:
        'Office furniture such as desks, chairs, and filing cabinets for non-profit organizations to create a functional and efficient work environment.',
      image:
        'https://ofova.com/wp-content/uploads/2024/06/hon-10700-ser-30x66-desk-rr-hang-bf-ped-mahog.jpg',
      donationItemId: 10,
      categoryIds: [11],
      price: '23.17',
    },
    {
      name: 'Power tools',
      description:
        'Power tools such as drills and saws for people in need to complete home improvement projects and repairs.',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/ghk-drills-176-1675789465.jpg',
      donationItemId: 11,
      categoryIds: [1, 12],
      price: '60.59',
    },
    {
      name: 'Art supplies',
      description:
        'Art supplies, such as paints, brushes, and canvas, for people to express their creativity and participate in art activities.',
      image: 'https://m.media-amazon.com/images/I/81TyZ3kQV3L.jpg',
      donationItemId: 12,
      categoryIds: [13],
      price: '17.95',
    },
    {
      name: 'Eco-friendly water bottles',
      description:
        'Eco-friendly water bottles made from reusable materials to reduce waste and promote sustainability.',
      image:
        'https://imgcdn.stablediffusionweb.com/2024/5/14/c06a3035-5055-41d2-a886-1f673b03e505.jpg',
      donationItemId: 13,
      categoryIds: [2],
      price: '19.67',
    },
    {
      name: 'Sporting equipment',
      description:
        'Sporting equipment, such as soccer balls and basketballs, for children to play and stay active, promoting physical fitness and exercise.',
      image:
        'https://discover.sportsengineplay.com/sites/default/files/styles/content_1024_w/public/images/shutterstock_1032332713.jpg?itok=8YdmvO8E',
      donationItemId: 14,
      categoryIds: [1, 8],
      price: '33.99',
    },
    {
      name: 'Guitar',
      description:
        'Music instruments, such as guitars and keyboards, for people to learn and enjoy playing music.',
      image:
        'https://www.sagamusic.com/wp-content/uploads/2020/07/CS-2_a_bg.png',
      donationItemId: 15,
      categoryIds: [3],
      price: '88.71',
    },
    {
      name: 'Blankets',
      description:
        'Blankets to provide warmth and comfort to those in need, especially during cold weather.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTndUBf6Hlzf7rSKJKPOrEg16WoCwrevE_psQ&s',
      donationItemId: 16,
      categoryIds: [4],
      price: '15.87',
    },
    {
      name: 'Non-perishable food',
      description:
        'Non-perishable food, such as canned goods and rice, to provide essential sustenance to those in need.',
      image:
        'https://media.gettyimages.com/id/458990173/photo/food-drive-collection.jpg?s=612x612&w=gi&k=20&c=dBvVJak4_IbUQpw44GF6Podg4LjWBEWk-pPEgkA0Lfw=',
      donationItemId: 17,
      categoryIds: [1, 5],
      price: '8.64',
    },
    {
      name: 'First aid supplies',
      description:
        'First aid supplies, such as bandages and antiseptic wipes, to help people treat minor injuries and maintain basic health and safety.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdfsfiGzJk1fgIVNO1TxlgGBAob1r6m5DNQw&s',
      donationItemId: 18,
      categoryIds: [10],
      price: '22.50',
    },
    {
      name: 'Gardening tools',
      description:
        'Gardening tools, such as shovels and rakes, for people to grow and maintain their own gardens, promoting self-sufficiency and sustainability.',
      image:
        'https://images-cdn.ubuy.co.in/65a3e17f7c83ef0ea8501987-small-garden-tools-6-pcs-mini-garden.jpg',
      donationItemId: 19,
      categoryIds: [2, 12],
      price: '17.40',
    },
    {
      name: 'Novels',
      description:
        'Books for people of all ages, promoting literacy and a love for reading.',
      image:
        'https://media.karousell.com/media/photos/products/2023/7/2/preloved_english_novel_fiction_1688310732_a3222c38_progressive.jpg',
      donationItemId: 20,
      categoryIds: [9],
      price: '21.00',
    },
  ],
  selectedDonationId: null,
  selectedDonationInformation: null,
};

const Donations = createSlice({
  name: 'donations',
  initialState: initialState,
  reducers: {
    resetDonations: () => {
      return initialState;
    },
    updateSelectedDonationId: (state, action) => {
      state.selectedDonationId = action.payload;
      state.selectedDonationInformation = state.items.find(
        item => item.donationItemId === action.payload,
      );
    },
  },
});
export const {resetDonations, updateSelectedDonationId} = Donations.actions;
export default Donations.reducer;
