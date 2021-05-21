import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Time } from "../defaultSelectValue";
import { addToBook } from "../redux/booking/booking-action";
import { useAppDispatch } from "../redux/store";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";
import SelectText from "./SelectText";

type bookingModalProps = React.HTMLProps<HTMLButtonElement> & {
  itemDetails: any;
  resetstateFn: any;
};
export default function BookingModal(props: bookingModalProps) {
  const { itemDetails, resetstateFn } = props;
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState<any>();
  const [form, setForm] = useState<any>();
  const { control } = useForm({});

  useEffect(() => {
    setModalShow(itemDetails);
    setForm({ ...form, id: itemDetails?.id });
  }, [itemDetails]);

  const closeModal = () => {
    setModalShow(null);
    resetstateFn();
  };

  const addToBooking = () => {
    if (Object.keys(form).length > 2) {
      dispatch(addToBook(form));
      setModalShow(null);
      setForm({});
    }
    resetstateFn();
  };

  return (
    <>
      {modalShow ? (
        <div className="w-screen h-screen absolute  z-50">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 lg:1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <img
                    src={itemDetails.image}
                    className="object-cover h-48 w-full "
                  />
                </div>
                <div className="relative p-6 flex-auto font-semithin">
                  <div className="mb-4">BOOKING</div>
                  <label className="">Time</label>
                  <SelectText
                    name="type"
                    placeholderText={"Select time "}
                    options={Time}
                    onChangeFn={(value: number) =>
                      setForm({ ...form, time: value })
                    }
                    control={control}
                  />
                  <label className="mt-4">Seat</label>
                  <InputText
                    placeholderText="seat"
                    valueItem={form.slot}
                    onChangeFn={(value: number) => {
                      setForm({ ...form, slot: Number(value) });
                    }}
                    typeInput={"number"}
                  />
                  <label className="mt-4">Remark</label>
                  <InputTextArea
                    name="remark"
                    onChangeFn={(value: string) => {
                      setForm({ ...form, remark: value });
                    }}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    CANCLE
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addToBooking()}
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}
