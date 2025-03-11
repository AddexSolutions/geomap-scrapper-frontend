"use client";

import { useEffect, useRef, useMemo } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import "./scrappingDataTable.css";

import ReactDOMServer from "react-dom/server";
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from "react-icons/md";

// Define your Place interface if needed
interface Place {
  name: string;
  rating: number;
  place_id: string;
  category: string;
  website: string;
  latitude: number;
  maps_link: string;
  updated_at: string;
  review_count: number;
  address: string;
  phone_number: string;
  longitude: number;
  created_at: string;
}

// Accept places as props
interface DataTableProps {
  places: Place[];
}

export default function DataTable({ places }: DataTableProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dtInstanceRef = useRef<DataTables.Api | null>(null);

  // Memoize pagination icons so they're computed only once
  const iconFirst = useMemo(
    () => ReactDOMServer.renderToStaticMarkup(<MdFirstPage />),
    []
  );
  const iconPrev = useMemo(
    () => ReactDOMServer.renderToStaticMarkup(<MdNavigateBefore />),
    []
  );
  const iconNext = useMemo(
    () => ReactDOMServer.renderToStaticMarkup(<MdNavigateNext />),
    []
  );
  const iconLast = useMemo(
    () => ReactDOMServer.renderToStaticMarkup(<MdLastPage />),
    []
  );

  // Memoize the columns definition since they are static.
  const columns = useMemo(
    () => [
      {
        data: "name",
        title: "Name",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<div class="text-truncate" style="max-width: 200px;" title="${value}">${value}</div>`,
      },
      {
        data: "rating",
        title: "Rating",
        render: (value: number, type: string) =>
          type === "export" ? value.toString() : value.toString(),
      },
      {
        data: "category",
        title: "Category",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<div style="max-width: 150px; white-space: nowrap;" title="${value}">${value}</div>`,
      },
      {
        data: "website",
        title: "Website",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<a href="${value}" target="_blank" class="btn btn-outline-dark btn-sm">Visit</a>`,
      },
      {
        data: "latitude",
        title: "Latitude",
        render: (value: number, type: string) =>
          type === "export" ? value.toString() : value.toString(),
      },
      {
        data: "longitude",
        title: "Longitude",
        render: (value: number, type: string) =>
          type === "export" ? value.toString() : value.toString(),
      },
      {
        data: "review_count",
        title: "Reviews",
        render: (value: number, type: string) =>
          type === "export" ? value.toString() : value.toString(),
      },
      {
        data: "phone_number",
        title: "Phone",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<a href="tel:${value}" class="btn btn-outline-dark btn-sm">Call</a>`,
      },
      {
        data: "address",
        title: "Address",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<div class="text-truncate" style="max-width: 250px;" title="${value}">${value}</div>`,
      },
      {
        data: "maps_link",
        title: "Map",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<a href="${value}" target="_blank" class="btn btn-outline-dark btn-sm">View</a>`,
      },
      {
        data: "created_at",
        title: "Created At",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<div class="text-truncate" style="max-width: 150px;" title="${value}">${value}</div>`,
      },
      {
        data: "updated_at",
        title: "Updated At",
        render: (value: string, type: string) =>
          type === "export"
            ? value
            : `<div class="text-truncate" style="max-width: 150px;" title="${value}">${value}</div>`,
      },
    ],
    []
  );

  useEffect(() => {
    if (!tableRef.current || places.length === 0) return;

    // Destroy any existing DataTable instance before reinitializing
    dtInstanceRef.current?.destroy();

    dtInstanceRef.current = $(tableRef.current).DataTable({
      data: places,
      autoWidth: false,
      columns,
      dom: "Blfrtip",
      buttons: [
        {
          filename: "Scraping Data",
          extend: "csvHtml5",
          text: "Export CSV",
          className: "btn btn-dark mb-3",
          exportOptions: {
            orthogonal: "export",
            modifier: { page: "all" },
            columns: ":visible",
          },
        },
      ],
      paging: true,
      pagingType: "full_numbers",
      language: {
        info: "Showing _START_ to _END_ of <strong>_TOTAL_</strong> entries",
        paginate: {
          first: iconFirst,
          previous: iconPrev,
          next: iconNext,
          last: iconLast,
        },
      },
      searching: true,
      ordering: true,
      responsive: true,
      destroy: true,
    });

    // Cleanup on unmount or when places/columns/icons update
    return () => {
      dtInstanceRef.current?.destroy();
      dtInstanceRef.current = null;
    };
  }, [places, columns, iconFirst, iconPrev, iconNext, iconLast]);

  return (
    <div className="p-6 bg-white border rounded-lg">
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="table table-hover w-full border-gray-300"
        ></table>
      </div>
    </div>
  );
}