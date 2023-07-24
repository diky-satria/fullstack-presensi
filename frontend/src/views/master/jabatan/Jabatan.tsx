import React, { useEffect, useState } from "react";
import axios from "../../../interceptor/axios";
import { TJabatan } from "../../../type";
import UserAll from "./component/JabatanAll";
import JabatanFormAdd from "./component/JabatanFormAdd";

export default function Jabatan() {
  const [data, setData] = useState<TJabatan[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [limit] = useState<number>(10);

  useEffect(() => {
    getJabatan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const getJabatan = async () => {
    let response = await axios.get(
      `/api/v1/jabatan?search=${search}&page=${page}&limit=${limit}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);
  };

  const changeSearchFunction = (search: string): void => {
    setPage(0);
    setSearch(search);
  };
  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>Jabatan</h4>
        <p>Semua jabatan</p>
      </div>
      <div className="row">
        <div className="col-md-8 mb-3">
          <UserAll
            data={data}
            page={page}
            setPage={setPage}
            limit={limit}
            totalPage={totalPage}
            totalRows={totalRows}
            handlePageClick={(selected) => setPage(selected)}
            changeSearch={(search) => changeSearchFunction(search)}
            getJabatan={getJabatan}
            setTotalRows={setTotalRows}
          />
        </div>
        <div className="col-md-4 mb-3">
          <JabatanFormAdd
            getJabatan={getJabatan}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
