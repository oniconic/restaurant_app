import { useEffect, useState } from "react";
import BookingModal from "../../Component/bookingModal";
import BookingOrderModal from "../../Component/bookingOrderModal";
import InputText from "../../Component/InputText";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function Home() {
  const { book, products } = useAppSelector((state) => state.book);
  const [items, setItems] = useState<any>([]);
  const [itemDetail, setItemDetail] = useState<any>();
  const [listBooking, setListBooking] = useState<any>();
  const [booking, setBooking] = useState<any>();
  const [search, setSearch] = useState<any>("");

  useEffect(() => {
    if (search) {
      const newSearch = products.filter((item: any) =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
      setItems(newSearch);
    } else {
      setItems(products);
    }
    setBooking(book);
  }, [products, book, search]);

  const resetState = () => {
    setItemDetail(null);
    setListBooking(null);
  };

  const totalOrder = () => {
    const total = booking?.filter((item: any) => item.id !== 0).length;
    return total;
  };

  return (
    <div className="w-full h-auto bg-gray-50">
      <BookingModal
        itemDetails={itemDetail}
        resetstateFn={() => resetState()}
      />
      <BookingOrderModal
        listOrder={listBooking}
        listProduct={items}
        resetstateFn={() => resetState()}
      />
      <div className="mt-20  tracking-wider flex text-5xl ml-32 font-extralight">
        <h1>
          food and grocery delivery from{" "}
          <span className="font-bold">Bangkok</span>'s
          <div className="">
            best <span className="font-bold">restaurants</span>
          </div>
        </h1>
      </div>
      <div className="mt-2 ml-32 font-thin">
        Enjoy delicious food in Bangkok from the best restaurants!
      </div>
      <div className=" w-3/5 ml-32  mt-8 p-2 rounded shadow-md bg-white flex">
        <div className="w-3/5">
          <InputText
            placeholderText="search ..."
            valueItem={search}
            onChangeFn={(value: string) => {
              setSearch(value);
            }}
          />
        </div>
        {search ? (
          <button
            className={
              "mt-0.5  mx-2 py-2.5 m-auto px-2 front-no-wrap truncate m-auto bg-red-300 h-full " +
              " flex-grow text-center text-gray-600  focus:outline-none"
            }
            onClick={() => setSearch("")}
          >
            CANCLE
          </button>
        ) : (
          <div
            className={
              "mt-0.5  mx-2 py-2.5 m-auto px-2 front-no-wrap truncate m-auto bg-green-300 h-full " +
              " flex-grow text-center text-gray-600  focus:outline-none"
            }
          >
            FIND RESTAURANT NEAR YOU
          </div>
        )}
      </div>

      <div className="ml-32 mt-32 text-4xl font-extralight">
        Popular restaurants
      </div>
      <div className="ml-32 mt-12 grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 mr-32 z-0">
        {items.map((item: any) => {
          return (
            <div className="pb-12">
              <img
                src={item.image}
                className="object-cover h-48 w-full transform transition hover:scale-105"
              />
              <div className="font-bold text-gray-700 mt-2 text-l">
                {item.title}
              </div>
              <button
                className="text-center m-auto w-full mt-4 bg-green-300 py-2 focus:outline-none hover:bg-green-400 text-gray-800 font-bold uppercase text-sm"
                onClick={() => setItemDetail(item)}
              >
                SELECT
              </button>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-full sticky">
        {totalOrder() ? (
          <div className="absolute bottom-0 left-full mr-14 pt-0.5 sticky text-white text-center align-center font-sans text-bold text-xl bg-red-500 rounded-full h-8 w-8 ">
            {totalOrder()}
          </div>
        ) : null}

        <button
          className="fas fa-list-alt absolute bottom-0 left-full text-6xl ml-2  z-40 sticky pr-4 pb-4  focus:outline-none text-gray-500"
          onClick={() => setListBooking(book)}
        ></button>
      </div>
    </div>
  );
}
