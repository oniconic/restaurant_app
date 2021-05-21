import React, { useEffect, useState } from "react";
import { Time } from "../defaultSelectValue";
import { removeFromBook } from "../redux/booking/booking-action";
import { useAppDispatch, useAppSelector } from "../redux/store";

type bookingModalProps = React.HTMLProps<HTMLButtonElement> & {
  listOrder: any;
  listProduct: any;
  resetstateFn: any;
};
export default function BookingOrderModal(props: bookingModalProps) {
  const { listOrder, listProduct, resetstateFn } = props;
  const { book } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState<any>();

  useEffect(() => {
    setModalShow(listOrder);
  }, [listOrder, book]);

  const removeOrder = (id: number) => {
    dispatch(removeFromBook(id));
  };

  const closeModal = () => {
    setModalShow(null);
    resetstateFn();
  };

  const convertNumberToTime = (idTime: number) => {
    const value = Time.find((item: any) => item.id === idTime)?.name;
    return <>{value}</>;
  };

  return (
    <>
      {modalShow ? (
        <div className="w-screen h-screen absolute  z-50 ">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 lg:1/3 my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex-row  w-full bg-white outline-none focus:outline-none p-2">
                <div className="px-5 py-2 font-bold text-2xl">ORDER</div>
                <button
                  className="absolute top-0 right-0 mt-4 mr-6"
                  onClick={() => closeModal()}
                >
                  <i className="fas fa-times"></i>
                </button>
                {book.length !== 1 ? (
                  <>
                    {book?.map((itemOrder: any) => {
                      if (itemOrder.id) {
                        const detail = listProduct.find(
                          (item: any) => itemOrder.id == item.id
                        );
                        return (
                          <div className="border px-5 py-1 m-4 front-sans font-bold uppercase text-sm shadow-md py-3">
                            <div className="grid grid-flow-col grid-cols-3 grid-rows-2 ">
                              <div className="text-bold mb-2 text-xl truncate">
                                {detail?.title}
                              </div>
                              <div className="">
                                <i className="far fa-clock"></i>
                                {"     "}
                                {convertNumberToTime(itemOrder?.time)}
                              </div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <button
                                className="bg-red-400 rounded-md mx-12 font-bold uppercase text-sm hover:bg-red-500"
                                onClick={() => removeOrder(itemOrder.code)}
                              >
                                CANCLE
                              </button>
                            </div>
                            <div className="text-bold  grid grid-flow-row grid-cols-3 ">
                              <div> total seat : {itemOrder.slot}</div>
                              <div>
                                Remark :{" "}
                                {itemOrder.remark ? itemOrder.remark : "-"}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <>
                    <div className="border px-5 py-4 m-4 text-center">
                      <div className="text-bold text-red-700 font-bold uppercase text-sm">
                        NO BOOKING ORDER
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}
