import * as actionTypes from "./booking-types";

interface timeInterface {
  id: number;
  name: string;
}
interface productInterface {
  id: number;
  title: string;
  image: string;
}

interface productsInterface {
  products: productInterface[];
  book: any;
}

const INITIAL_STATE: productsInterface = {
  products: [
    {
      id: 1,
      title: "Kao Mun Kai",
      image:
        "https://img.wongnai.com/p/1920x0/2017/06/22/bbf899f7ab4341dea4aec6330c2afafd.jpg",
    },
    {
      id: 2,
      title: "KFC",
      image:
        "https://img.wongnai.com/p/1920x0/2020/04/28/6bec617744604fb9962720f29610aa7e.jpg",
    },
    {
      id: 3,
      title: "starbuck",
      image:
        "https://img.wongnai.com/p/1920x0/2018/10/18/06d171316c864328a68adb19c2c8873a.jpg",
    },
    {
      id: 4,
      title: "McDonale'S",
      image:
        "https://img.wongnai.com/p/1920x0/2019/09/02/468989ae6a454ab58c82ccc369aafc38.jpg",
    },
    {
      id: 5,
      title: "Burger King",
      image: "https://assets.brandinside.asia/uploads/2019/05/02.jpg",
    },
    {
      id: 6,
      title: "Subway",
      image:
        "https://brandinside.asia/wp-content/uploads/2018/09/shutterstock_1025584780-e1536644709450.jpg",
    },
    {
      id: 7,
      title: "Bonchon",
      image:
        "https://promotions.co.th/wp-content/uploads/2019/09/bonchon-coupon-combo-set.jpg",
    },
    {
      id: 8,
      title: "Pizza company",
      image:
        "https://www.reviewaraidee.com/wp-content/uploads/2019/09/reviewaraideefb-7.jpg",
    },
    {
      id: 9,
      title: "Choongman",
      image:
        "https://condotiddoi.com/condocontentimg2/2559/NEWS%2011-2020/3/30102563%20BE%20_1_201105_2.jpg",
    },
    {
      id: 10,
      title: "Isao",
      image:
        "https://img.wongnai.com/p/1920x0/2021/05/13/3ba9c8860bcf4c0fba2072cb4396bd51.jpg",
    },
    {
      id: 11,
      title: "Copper International Buffet",
      image:
        "https://img.wongnai.com/p/1920x0/2019/07/29/ca1ad835575a41a2a74d18f8c3273c01.jpg",
    },
    {
      id: 12,
      title: "Kosirae",
      image:
        "https://img.wongnai.com/p/1920x0/2016/09/09/2d1e7d2348ba43cf8f80f5f5fe480989.jpg",
    },
    {
      id: 13,
      title: "Tenyuu Grand",
      image:
        "https://img.wongnai.com/p/1920x0/2016/09/09/2d1e7d2348ba43cf8f80f5f5fe480989.jpg",
    },
    {
      id: 14,
      title: "ABOVE ELEVEN",
      image:
        "https://img.wongnai.com/p/1920x0/2017/07/14/ef8e44bef6f947c58f29e68a44978771.jpg",
    },
    {
      id: 15,
      title: "Koko Japanese Restaurant",
      image:
        "https://img.wongnai.com/p/1920x0/2019/08/04/6e222f14c81a4faa883ed954b2c3d811.jpg",
    },
    {
      id: 16,
      title: "Katsushin",
      image:
        "https://img.wongnai.com/p/1920x0/2020/07/25/9121c6c1f5b74065bb21dd679d719f09.jpg",
    },
  ],
  book: [{ id: 0, slot: 0, time: 0 }],
};

export default function bookReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case actionTypes.ADD_TO_BOOK:
      return {
        ...state,
        book: state.book.concat([
          {
            id: action.payload.id,
            slot: action.payload.slot,
            time: action.payload.time,
            remark: action.payload.remark,
            code: action.payload.code,
          },
        ]),
      };
    case actionTypes.REMOVE_FROM_BOOK:
      return {
        ...state,
        book: state.book.filter(
          (item: any) => item.code !== action.payload.code
        ),
      };
    default:
      return state;
  }
}
