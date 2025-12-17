import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import {
  ChevronLeft,
  ChevronDown,
  GripVertical,
  Settings,
  Trash2,
} from "lucide-react";

//1
const getActiveCols = () => {
  if (window.innerWidth <= 640) return 4;    // Mobile
  if (window.innerWidth <= 1024) return 8;   // Tablet
  return 12;                                 // Desktop
};
//

function TableSettings({ activeWidget, setActiveWidget }) {
  const [tab, setTab] = useState("DATA");
  const [applyFilter, setApplyFilter] = useState(false);

  const columnOptions = [
    "Order ID",
    "Customer name",
    "Email id",
    "Address",
    "Order date",
    "Product",
    "Created by",
    "Status",
    "Total amount",
    "Unit price",
    "Quantity",
  ];

  const filterAttributes = ["Product", "Quantity", "Status"];
  const operators = ["=", "!=", ">", ">=", "<", "<=", "Contains"];

  /* LIMIT TO 3 COLUMNS */
  const handleColumnChange = (e) => {
    const selected = [...e.target.selectedOptions].map((o) => o.value);
    if (selected.length > 3) return;
    setActiveWidget({ ...activeWidget, columns: selected });
  };




  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border rounded overflow-hidden">
        <button
          className={`flex-1 py-1 text-sm ${tab === "DATA" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          onClick={() => setTab("DATA")}
        >
          Data
        </button>
        <button
          className={`flex-1 py-1 text-sm ${tab === "STYLE" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          onClick={() => setTab("STYLE")}
        >
          Styling
        </button>
      </div>

      {/* ================= DATA TAB ================= */}
      {tab === "DATA" && (
        <>
          <Input
            label="Widget title *"
            value={activeWidget.title || ""}
            onChange={(e) =>
              setActiveWidget({ ...activeWidget, title: e.target.value })
            }
          />

          <Select label="Widget type *" options={["Table"]} disabled />

          <Textarea label="Description" />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Width (Columns) *"
              type="number"
              min={1}
              max={12}
              value={activeWidget.w || 4}
              onChange={(e) =>
                setActiveWidget({
                  ...activeWidget,
                  w: Number(e.target.value),
                })
              }
            />
            <Input
              label="Height (Rows) *"
              type="number"
              min={1}
              max={10}
              value={activeWidget.h || 3}
              onChange={(e) =>
                setActiveWidget({
                  ...activeWidget,
                  h: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Choose columns */}
          {/* Choose columns (max 3) */}
          <div>
            <label className="text-xs text-gray-600">
              Choose columns *
            </label>

            {/* Selected chips */}
            <div className="flex flex-wrap gap-1 border rounded px-2 py-2 mt-1">
              {(activeWidget.columns || []).map((col) => (
                <span
                  key={col}
                  className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                >
                  {col}
                  <button
                    onClick={() =>
                      setActiveWidget({
                        ...activeWidget,
                        columns: activeWidget.columns.filter((c) => c !== col),
                      })
                    }
                    className="text-green-700 hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {/* Dropdown */}
              {(activeWidget.columns || []).length < 3 && (
                <select
                  className="text-sm outline-none"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;

                    setActiveWidget({
                      ...activeWidget,
                      columns: [...(activeWidget.columns || []), value],
                    });

                    e.target.value = "";
                  }}
                >
                  <option value="">Select</option>
                  {columnOptions
                    .filter(
                      (c) => !(activeWidget.columns || []).includes(c)
                    )
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>


          <Select
            label="Sort by"
            options={["Ascending", "Descending"]}
            value={activeWidget.sortOrder || ""}
            onChange={(e) =>
              setActiveWidget({
                ...activeWidget,
                sortOrder: e.target.value,
              })
            }
          />

          <Select
            label="Pagination"
            options={[5, 10, 15]}
            value={activeWidget.pagination || ""}
            onChange={(e) =>
              setActiveWidget({
                ...activeWidget,
                pagination: Number(e.target.value),
              })
            }
          />

          {/* Apply filter */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={applyFilter}
              onChange={(e) => setApplyFilter(e.target.checked)}
            />
            <label className="text-sm">Apply filter</label>
          </div>

          {applyFilter && (
            <div className="border rounded p-2 space-y-2">
              <Select
                label="Choose attribute"
                options={filterAttributes}
                value={activeWidget.filterAttr || ""}
                onChange={(e) =>
                  setActiveWidget({
                    ...activeWidget,
                    filterAttr: e.target.value,
                  })
                }
              />

              <Select
                label="Operator"
                options={operators}
                value={activeWidget.filterOp || ""}
                onChange={(e) =>
                  setActiveWidget({
                    ...activeWidget,
                    filterOp: e.target.value,
                  })
                }
              />

              <Input
                label="Value"
                value={activeWidget.filterValue || ""}
                onChange={(e) =>
                  setActiveWidget({
                    ...activeWidget,
                    filterValue: e.target.value,
                  })
                }
              />

              <button className="text-green-600 text-sm">
                + Add filter
              </button>
            </div>
          )}
        </>
      )}

      {/* ---------------- STYLING TAB ---------------- */}
      {tab === "STYLE" && (
        <>
          <Input
            label="Font size"
            type="number" min={12}
            max={20} value={activeWidget.fontSize || 14}
            onChange={(e) => setActiveWidget({
              ...activeWidget,
              fontSize: Number(e.target.value),
            })} />
          <Input label="Header background"
            type="color"
            value={activeWidget.headerBg || "#D8D8D8"}
            onChange={(e) => setActiveWidget({
              ...activeWidget, headerBg: e.target.value,

            })}
          />
        </>
      )}
    </div>
  );
}
// charts

function ChartSettings({ activeWidget, setActiveWidget }) {
  const AXIS_OPTIONS = [
    "Customer ID",
    "Customer name",
    "Email id",
    "Address",
    "Order date",
    "Product",
    "Created by",
    "Status",
    "Total amount",
    "Unit price",
    "Quantity",
  ];

  const CHART_TYPES = [
    "Bar Chart",
    "Line Chart",
    "Area Chart",
    "Scatter Chart",
  ];

  return (
    <div className="space-y-4">
      {/* Widget title */}
      <Input
        label="Widget title *"
        value={activeWidget.title || ""}
        onChange={(e) =>
          setActiveWidget({ ...activeWidget, title: e.target.value })
        }
      />

      {/* Widget type */}
      <Select
        label="Widget type *"
        options={CHART_TYPES}
        value={activeWidget.chartType || "Bar Chart"}
        onChange={(e) =>
          setActiveWidget({
            ...activeWidget,
            chartType: e.target.value,
          })
        }
      />



      {/* Description */}
      <Textarea label="Description" />

      {/* Widget size */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">
          Widget size
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Width*"
            type="number"
            min={1}
            max={12}
            value={activeWidget.w ?? 4}
            onChange={(e) =>
              setActiveWidget({
                ...activeWidget,
                w: Number(e.target.value),
              })
            }
          />
          <Input
            label="Heigh*"
            type="number"
            min={1}
            max={12}
            value={activeWidget.h ?? 4}
            onChange={(e) =>
              setActiveWidget({
                ...activeWidget,
                h: Number(e.target.value),
              })
            }
          />
        </div>


      </div>

      {/* Data setting */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Data setting
        </p>

        <Select
          label="Choose X-axis data"
          options={AXIS_OPTIONS}
          value={activeWidget.xAxis || ""}
          onChange={(e) =>
            setActiveWidget({
              ...activeWidget,
              xAxis: e.target.value,
            })
          }
        />

        <Select
          label="Choose Y-axis data"
          options={AXIS_OPTIONS}
          value={activeWidget.yAxis || ""}
          onChange={(e) =>
            setActiveWidget({
              ...activeWidget,
              yAxis: e.target.value,
            })
          }
        />

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={activeWidget.showLabel || false}
            onChange={(e) =>
              setActiveWidget({
                ...activeWidget,
                showLabel: e.target.checked,
              })
            }
          />
          <label className="text-sm">Show data label</label>
        </div>
      </div>
    </div>
  );
}

// 
function PieChartSettings({ activeWidget, setActiveWidget }) {
  const PIE_DATA_OPTIONS = [
    "Product",
    "Quantity",
    "Unit price",
    "Total amount",
    "Status",
    "Created by",
  ];

  return (
    <div className="space-y-4">
      {/* Widget title */}
      <Input
        label="Widget title *"
        value={activeWidget.title || ""}
        onChange={(e) =>
          setActiveWidget({ ...activeWidget, title: e.target.value })
        }
      />

      {/* Widget type */}
      <Select
        label="Widget type *"
        options={["Pie Chart"]}
        disabled
        value="Pie Chart"
      />

      {/* Description */}
      <Textarea label="Description" />

      {/* Widget size */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Width (Columns) *"
          type="number"
          min={1}
          max={12}
          value={activeWidget.w ?? 4}
          onChange={(e) =>
            setActiveWidget({
              ...activeWidget,
              w: Number(e.target.value),
            })
          }
        />
        <Input
          label="Height (Rows) *"
          type="number"
          min={1}
          max={12}
          value={activeWidget.h ?? 4}
          onChange={(e) =>
            setActiveWidget({
              ...activeWidget,
              h: Number(e.target.value),
            })
          }
        />
      </div>

      {/* Data setting */}
      <Select
        label="Choose chart data *"
        options={PIE_DATA_OPTIONS}
        value={activeWidget.dataKey || ""}
        onChange={(e) =>
          setActiveWidget({
            ...activeWidget,
            dataKey: e.target.value,
          })
        }
      />

      {/* Show legend */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={activeWidget.showLegend ?? true}
          onChange={(e) =>
            setActiveWidget({
              ...activeWidget,
              showLegend: e.target.checked,
            })
          }
        />
        <label className="text-sm">Show legend</label>
      </div>
    </div>
  );
}


//
const CELL_HEIGHT = 50;
export default function Configured() {
  const navigate = useNavigate();
  const location = useLocation();
  //2


  const [activeCols, setActiveCols] = useState(getActiveCols());

  useEffect(() => {
    const onResize = () => setActiveCols(getActiveCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  //




  /* ✅ ORDERS FROM Orders.jsx */
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("dashboardWidgets");
    if (saved) {
      setWidgets(JSON.parse(saved));
    }
  }, []);


  const [dateRange, setDateRange] = useState("All time");
  const [openRange, setOpenRange] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  /* widgets */
  const [widgets, setWidgets] = useState({});

  /* SETTINGS POPUP STATE */
  const [openSettings, setOpenSettings] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  /* ✅ CONFIG STATES */
  const [metric, setMetric] = useState("");
  const [aggregation, setAggregation] = useState("Sum");
  const [decimalPrecision, setDecimalPrecision] = useState(0);


  const [widgetTitle, setWidgetTitle] = useState("Untitled");


  const [toast, setToast] = useState("");
  const [deleteWidgetId, setDeleteWidgetId] = useState(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);


  const ranges = ["Today", "Last 30 days", "Last 90 days", "All time"];


  const calculateValue = () => {
    if (!orders || orders.length === 0) return 0;

    const now = new Date();

    const filteredOrders = orders.filter((o) => {
      if (dateRange === "All time") return true;

      const orderDate = new Date(o.createdAt || o.orderDate);

      if (dateRange === "Today") {
        return orderDate.toDateString() === now.toDateString();
      }

      if (dateRange === "Last 30 days") {
        return (now - orderDate) / (1000 * 60 * 60 * 24) <= 30;
      }

      if (dateRange === "Last 90 days") {
        return (now - orderDate) / (1000 * 60 * 60 * 24) <= 90;
      }

      return true;
    });

    if (aggregation === "Count") {
      return filteredOrders.length;
    }

    let values = filteredOrders.map((o) => {
      switch (metric) {
        case "Total amount":
          return o.quantity * o.unitPrice;
        case "Quantity":
          return o.quantity;
        case "Unit price":
          return o.unitPrice;
        default:
          return 0;
      }
    });

    if (aggregation === "Sum") {
      return values.reduce((a, b) => a + Number(b || 0), 0);
    }

    if (aggregation === "Average") {
      return (
        values.reduce((a, b) => a + Number(b || 0), 0) /
        (values.length || 1)
      );
    }

    return 0;
  };



  /* DROP HANDLER */
  const handleDrop = (index, e) => {


    const widgetType = e.dataTransfer.getData("widgetType");

    // const row = Math.floor(index / 12);
    // const col = index % 12;
    // 4
    const row = Math.floor(index / activeCols);
    const col = index % activeCols;


    const id = Date.now();

    const newWidget = {
      id,
      widgetType,
      title: "Untitled",
      row,
      col,
      w: 2,
      h: 2,
      metric: "",
      aggregation: "Count",
      decimalPrecision: 0,
      value: 0,

      // 👇 ADD THESE
      columns: [],
      sortOrder: "Ascending",
      pagination: 5,
      filters: [],
      fontSize: 14,
      headerBg: "#D8D8D8",

      // 👇 PIE DEFAULT SIZE
      w: widgetType === "PIE_CHART" ? 4 : 2,
      h: widgetType === "PIE_CHART" ? 4 : 2,

      // 👇 PIE DEFAULT CONFIG
      dataKey: "",
      showLegend: true,

      isConfigured: false,
    };

    setWidgets((prev) => ({
      ...prev,
      [id]: newWidget,
    }));

    setActiveWidget(newWidget);
    setWidgetTitle("Untitled");
    setMetric("");
    setAggregation("Count");
    setDecimalPrecision(0);
    setOpenSettings(true);

    setDragging(false);
    setHoverIndex(null);
  };


  const removeWidget = (id) => {
    const copy = { ...widgets };
    delete copy[id];
    setWidgets(copy);
  };

  const getWidgetAtCell = (row, col) => {
    return Object.values(widgets).find(
      (w) =>
        row >= w.row &&
        row < w.row + w.h &&
        col >= w.col &&
        col < w.col + w.w
    );
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b">
        <button
          onClick={() => navigate("/")}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <div>
          <h1 className="font-semibold text-lg">Configure dashboard</h1>
          <p className="text-sm text-gray-500">
            Configure your dashboard to start viewing analytics
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="hidden md:flex w-72 bg-white border-r p-4 flex-col gap-4">

          <div>
            <label className="text-sm font-medium text-gray-700">
              View Data For
            </label>
            <div className="relative mt-1">
              <button
                onClick={() => setOpenRange(!openRange)}
                className="w-full flex items-center justify-between border rounded px-3 py-2 text-sm"
              >
                {dateRange}
                <ChevronDown size={16} />
              </button>

              {openRange && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
                  {ranges.map((r) => (
                    <div
                      key={r}
                      onClick={() => {
                        setDateRange(r);
                        setOpenRange(false);
                      }}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm font-medium text-gray-700">
            Drag and drop your canvas
          </p>

          <Section title="Charts">
            <WidgetItem label="Bar Chart" type="BAR_CHART" setDragging={setDragging} setHoverIndex={setHoverIndex} />
            <WidgetItem label="Line Chart" type="LINE_CHART" setDragging={setDragging} setHoverIndex={setHoverIndex} />
            <WidgetItem label="Area Chart" type="AREA_CHART" setDragging={setDragging} setHoverIndex={setHoverIndex} />
            <WidgetItem label="Pie Chart" type="PIE_CHART" setDragging={setDragging} setHoverIndex={setHoverIndex} />
          </Section>


          <Section title="Tables">
            <WidgetItem
              label="Table"
              type="TABLE"
              setDragging={setDragging}
              setHoverIndex={setHoverIndex}
            />
          </Section>

          <Section title="KPIs">
            <WidgetItem
              label="KPI Value"
              type="KPI"
              setDragging={setDragging}
              setHoverIndex={setHoverIndex}
            />
          </Section>
        </div>

        {/* GRID */}
        <div className="flex-1 relative bg-gray-50">
          <div
            className="absolute  inset-x-0 top-0 bottom-24 overflow-auto p-6"
            onClick={() => setSelectedWidgetId(null)}
          >

            {/* <div className="grid grid-cols-12 gap-3"> */}
            {/* 3 */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${activeCols}, 1fr)`,
                minHeight: "120vh",   // 🔥 THIS IS THE FIX
              }}
            >


              {Array.from({ length: activeCols * 12 }).map((_, i) => {
                const row = Math.floor(i / 12);
                const col = i % 12;
                const widget = getWidgetAtCell(row, col);

                if (widget && !(widget.row === row && widget.col === col)) {
                  return null;
                }

                if (widget) {
                  return (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWidgetId(widget.id);
                      }}
                      className={`bg-white border-2 rounded p-2 cursor-pointer
    ${selectedWidgetId === widget.id
                          ? "border-blue-500 shadow-lg"
                          : "border-emerald-500"
                        }`}
                      style={{
                        // gridColumn: `span ${widget.w}`,
                        gridColumn: `span ${Math.min(widget.w, activeCols)}`,
                        gridRow: `span ${widget.h}`,
                        minHeight: widget.h * CELL_HEIGHT,

                      }}
                    >


                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">{widget.title}</span>
                        {(selectedWidgetId === widget.id || !widget.isConfigured) && (
                          <div className="flex gap-1">

                            <Settings
                              size={14}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveWidget(widget);
                                setWidgetTitle(widget.title || "Untitled");
                                setMetric(widget.metric || "");
                                setAggregation(widget.aggregation || "Count");
                                setDecimalPrecision(widget.decimalPrecision || 0);
                                setOpenSettings(true);
                              }}
                              className="cursor-pointer hover:text-blue-600"
                            />

                            <Trash2
                              size={14}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteWidgetId(widget.id);
                              }}
                              className="cursor-pointer hover:text-red-600"
                            />

                          </div>
                        )}

                      </div>

                      <div className="h-full">


                        {widget.widgetType === "TABLE" && widget.isConfigured && (
                          <TableWidget widget={widget} orders={orders} />
                        )}
                        {widget.widgetType === "PIE_CHART" && widget.isConfigured && (
                          <PieChartWidget widget={widget} orders={orders} />
                        )}


                        {["BAR_CHART", "LINE_CHART", "AREA_CHART", "SCATTER_CHART"].includes(
                          widget.widgetType
                        ) && widget.isConfigured && (
                            <ChartWidget widget={widget} orders={orders} />
                          )}

                        {widget.widgetType === "KPI" && (
                          <div className="flex items-center justify-center h-full text-xl font-semibold">
                            {widget.value ?? 0}
                          </div>
                        )}

                      </div>

                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (dragging) setHoverIndex(i);
                    }}
                    onDrop={(e) => handleDrop(i, e)}   // ✅ NEW

                    className={`h-[51px] rounded ${dragging && hoverIndex === i
                        ? "bg-green-200 border-2 border-green-500"
                        : "bg-gray-200"
                      }`}
                  />
                );
              })}
            </div>
          </div>

          {/* GRID FOOTER */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
            <button
              className="px-4 py-2 text-sm border rounded text-gray-600"
              onClick={() => {
                setWidgets({});          // ❌ remove all widgets
                setToast("cancelled");
                setTimeout(() => setToast(""), 3000);
              }}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 text-sm rounded bg-green-600 text-white"
              onClick={() => {
                localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
                setToast("saved");
                setTimeout(() => setToast(""), 3000);
              }}
            >
              Save
            </button>

          </div>
        </div>
      </div>

      {/* SETTINGS POPUP (UPDATED TO MATCH IMAGE)KPI */}
      {openSettings && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="w-full sm:w-[420px] bg-white h-full p-4 flex flex-col">

            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-semibold">Widget configuration</h2>
              <button onClick={() => setOpenSettings(false)}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto mt-4 space-y-3">
              {activeWidget?.widgetType === "TABLE" && (
                <TableSettings
                  activeWidget={activeWidget}
                  setActiveWidget={setActiveWidget}
                />
              )}
              {["BAR_CHART", "LINE_CHART", "AREA_CHART"].includes(activeWidget?.widgetType) && (
                <ChartSettings
                  activeWidget={activeWidget}
                  setActiveWidget={setActiveWidget}
                />
              )}
              {activeWidget?.widgetType === "PIE_CHART" && (
                <PieChartSettings
                  activeWidget={activeWidget}
                  setActiveWidget={setActiveWidget}
                />
              )}



              {activeWidget?.widgetType === "KPI" && (
                <>
                  <Input
                    label="Widget title *"
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                  />

                  <Select
                    label="Widget type *"
                    options={["KPI"]}
                    disabled
                  />

                  <Textarea label="Description" />

                  <div className="grid grid-cols-2 gap-2">
                    <Input label="Width (Columns) *" type="number" value={2} readOnly />
                    <Input label="Height (Rows) *" type="number" value={2} readOnly />
                  </div>

                  <Select
                    label="Select metric *"
                    options={[
                      "Customer ID",
                      "Customer name",
                      "Email id",
                      "Address",
                      "Order date",
                      "Product",
                      "Created by",
                      "Status",
                      "Total amount",
                      "Unit price",
                      "Quantity",
                    ]}
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                  />

                  <Select
                    label="Aggregation *"
                    options={["Sum", "Average", "Count"]}
                    value={aggregation}
                    onChange={(e) => setAggregation(e.target.value)}
                  />

                  <Select
                    label="Data format *"
                    options={["Number", "Currency"]}
                  />

                  <div>
                    <label className="text-xs text-gray-600">
                      Decimal precision *
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={decimalPrecision}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= 5) {
                          setDecimalPrecision(value);
                        }
                      }}
                      className="w-full border rounded px-2 py-1 mt-1 text-sm"
                    />
                  </div>
                </>
              )}

            </div>

            <div className="flex justify-end gap-2 border-t pt-3">
              <button
                onClick={() => setOpenSettings(false)}
                className="px-4 py-2 text-sm border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (!activeWidget) {
                    alert("First drag a widget into the grid");
                    return;
                  }

                  setWidgets((prev) => {
                    const current = prev[activeWidget.id];

                    /* ================= KPI ================= */
                    if (activeWidget.widgetType === "KPI") {
                      const value = calculateValue();

                      return {
                        ...prev,
                        [activeWidget.id]: {
                          ...current,
                          title: widgetTitle,
                          metric,
                          aggregation,
                          decimalPrecision,
                          value,
                          isConfigured: true,
                        },
                      };
                    }

                    /* ================= CHART (👉 IDHA INGATHAAN PASTE) ================= */
                    if (
                      ["BAR_CHART", "LINE_CHART", "AREA_CHART", "SCATTER_CHART"].includes(
                        activeWidget.widgetType
                      )
                    ) {
                      return {
                        ...prev,
                        [activeWidget.id]: {
                          ...current,
                          title: activeWidget.title,
                          chartType: activeWidget.chartType, // Bar / Line / Area / Scatter
                          xAxis: activeWidget.xAxis,         // from dropdown
                          yAxis: activeWidget.yAxis,         // from dropdown
                          w: activeWidget.w,
                          h: activeWidget.h,
                          isConfigured: true,
                        },
                      };
                    }

                    /* ================= PIE CHART ================= */
                    if (activeWidget.widgetType === "PIE_CHART") {
                      return {
                        ...prev,
                        [activeWidget.id]: {
                          ...current,
                          title: activeWidget.title,
                          w: activeWidget.w,
                          h: activeWidget.h,
                          dataKey: activeWidget.dataKey,
                          showLegend: activeWidget.showLegend,
                          isConfigured: true,
                        },
                      };
                    }


                    /* ================= TABLE ================= */
                    if (activeWidget.widgetType === "TABLE") {
                      return {
                        ...prev,
                        [activeWidget.id]: {
                          ...current,

                          // BASIC
                          title: activeWidget.title,
                          description: activeWidget.description,
                          w: activeWidget.w,
                          h: activeWidget.h,

                          // DATA
                          columns: activeWidget.columns,
                          sortOrder: activeWidget.sortOrder,
                          pagination: activeWidget.pagination,

                          // FILTER
                          filterAttr: activeWidget.filterAttr,
                          filterOp: activeWidget.filterOp,
                          filterValue: activeWidget.filterValue,

                          // STYLE
                          fontSize: activeWidget.fontSize,
                          headerBg: activeWidget.headerBg,

                          isConfigured: true,
                        },
                      };
                    }

                    return prev;
                  });

                  setOpenSettings(false);
                  setToast("added");
                  setTimeout(() => setToast(""), 3000);
                }}
              >
                Add
              </button>

            </div>
          </div>
        </div>
      )}

      {deleteWidgetId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded p-5">
            <h3 className="font-semibold mb-2">Delete</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete the{" "}
              <span className="font-semibold">Untitled widget</span>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteWidgetId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeWidget(deleteWidgetId);
                  setDeleteWidgetId(null);
                  setToast("deleted");

                  setTimeout(() => setToast(""), 3000);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>


        </div>
      )}
      {/* 🔔 GLOBAL TOAST (ADD + DELETE) */}
      {/* 🔔 GLOBAL TOAST (ADD + DELETE + CANCEL + SAVE) */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-100 border border-green-300 px-4 py-3 rounded shadow flex items-center gap-2">
          <span className="text-sm text-green-700">
            {toast === "added"
              ? "All set! Your new widget has been added successfully!"
              : toast === "deleted"
                ? "Done! Your widget has been deleted"
                : toast === "saved"
                  ? "Dashboard saved successfully"
                  : "Dashboard cleared"}
          </span>
          <button onClick={() => setToast("")}>✕</button>
        </div>
      )}

    </div>
  );
}




/* ---------- HELPERS (UNCHANGED) ---------- */

function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 border rounded">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium bg-gray-50"
      >
        {title}
        <ChevronDown size={16} className={open ? "rotate-180" : ""} />
      </button>
      {open && <div className="px-2 pb-2">{children}</div>}
    </div>
  );
}

function WidgetItem({ label, type, setDragging, setHoverIndex }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("widgetType", type); // ✅ ADD THIS
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
        setHoverIndex(null);
      }}
      className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 cursor-grab"
    >
      <GripVertical size={16} className="text-gray-400" />
      <span className="text-sm">{label}</span>
    </div>
  );
}


const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full border rounded px-2 py-1 mt-1 text-sm"
    />
  </div>
);

const Select = ({
  label,
  options = [],
  disabled,
  value,
  onChange,
}) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <select
      disabled={disabled}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-2 py-1 mt-1 text-sm"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);


const Textarea = ({ label }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <textarea className="w-full border rounded px-2 py-1 mt-1 text-sm" />
  </div>
);


//

const COLUMN_KEY_MAP = {
  "Order ID": "orderId",
  "Customer name": "customerName",
  "Email id": "email",
  "Address": "address",
  "Order date": "orderDate",
  "Product": "product",
  "Created by": "createdBy",
  "Status": "status",
  "Total amount": "totalAmount",
  "Unit price": "unitPrice",
  "Quantity": "quantity",
};

//charts 

const AXIS_KEY_MAP = {
  "Customer ID": "_id",
  "Customer name": "customerName",
  "Email id": "email",
  "Address": "address",
  "Order date": "createdAt",
  "Product": "product",
  "Created by": "createdBy",
  "Status": "status",
  "Total amount": "totalAmount",
  "Unit price": "unitPrice",
  "Quantity": "quantity",
};




function TableWidget({ widget = {}, orders = [] }) {
  const columns = widget.columns || [];
  let data = Array.isArray(orders) ? [...orders] : [];

  /* ================= COLUMN VALUE RESOLVER ================= */
  const resolveValue = (order, column, index) => {
    switch (column) {
      case "Customer name":
        return `${order.firstName || ""} ${order.lastName || ""}`;

      case "Address":
        return `${order.street || ""}, ${order.city || ""}, ${order.state || ""} - ${order.postal || ""}`;

      case "Order ID":
        return `ORD-${String(index + 1).padStart(4, "0")}`;

      case "Order date":
        return order.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "-";

      case "Total amount":
        return order.quantity && order.unitPrice
          ? order.quantity * order.unitPrice
          : 0;

      default: {
        const key = COLUMN_KEY_MAP[column];
        return key ? order[key] ?? "-" : "-";
      }
    }
  };

  /* ================= FILTER ================= */
  if (widget.filterAttr && widget.filterOp && widget.filterValue) {
  data = data.filter((o, i) => {
    const v = resolveValue(o, widget.filterAttr, i);
    const val = widget.filterValue;

    const vNum = Number(v);
    const valNum = Number(val);
    const isNumber = !isNaN(vNum) && !isNaN(valNum);

    switch (widget.filterOp) {
      case "=":
        return isNumber ? vNum === valNum : String(v) === val;

      case "!=":
        return isNumber ? vNum !== valNum : String(v) !== val;

      case ">":
        return vNum > valNum;

      case "<":
        return vNum < valNum;

      case "Contains":
        return String(v || "")
          .toLowerCase()
          .includes(val.toLowerCase());

      default:
        return true;
    }
  });
}

  /* ================= PAGINATION ================= */
  data = data.slice(0, widget.pagination || 5);

  /* ================= SAFE UI ================= */
  if (!columns.length) {
    return (
      <div className="p-4 text-sm text-gray-400">
        No columns selected
      </div>
    );
  }

  /* ================= TABLE ================= */
  return (
    <div className="overflow-auto h-full">
      <table
        className="w-full border text-sm"
        style={{ fontSize: widget.fontSize || 14 }}
      >
        <thead style={{ background: widget.headerBg || "#eee" }}>
          <tr>
            {columns.map((c) => (
              <th key={c} className="border px-2 py-1 text-left">
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((o, i) => (
            <tr key={o._id || i}>
              {columns.map((c) => (
                <td key={c} className="border px-2 py-1">
                  {resolveValue(o, c, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//chart 

function ChartWidget({ widget, orders }) {
  /* ================= SAFE CHART TYPE ================= */
  const chartType =
    widget.chartType ||
    (widget.widgetType === "BAR_CHART" && "Bar Chart") ||
    (widget.widgetType === "LINE_CHART" && "Line Chart") ||
    (widget.widgetType === "AREA_CHART" && "Area Chart") ||
    (widget.widgetType === "SCATTER_CHART" && "Scatter Chart");

  /* ================= EMPTY STATE ================= */
  if (!widget?.xAxis || !widget?.yAxis) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Select X & Y axis
      </div>
    );
  }

  /* ================= BUILD CHART DATA ================= */
  const data = orders.map((o) => {
    const xKey = AXIS_KEY_MAP[widget.xAxis];
    const yKey = AXIS_KEY_MAP[widget.yAxis];

    let xValue = "N/A";
    if (widget.xAxis === "Customer name") {
      xValue = `${o.firstName || ""} ${o.lastName || ""}`;
    } else if (widget.xAxis === "Order date") {
      xValue = o.createdAt
        ? new Date(o.createdAt).toLocaleDateString()
        : "N/A";
    } else {
      xValue = o[xKey] ?? "N/A";
    }

    let yValue = 0;
    if (widget.yAxis === "Total amount") {
      yValue = (o.quantity || 0) * (o.unitPrice || 0);
    } else {
      yValue = Number(o[yKey]) || 0;
    }

    return { x: xValue, y: yValue };
  });

  /* ================= RENDER ================= */
  return (
    <ResponsiveContainer width="100%" height="100%">

      {/* ---------- BAR ---------- */}
      {chartType === "Bar Chart" && (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="y" fill="#54BD95">
            {widget.showLabel && (
              <LabelList dataKey="y" position="top" />
            )}
          </Bar>
        </BarChart>
      )}

      {/* ---------- LINE ---------- */}
      {chartType === "Line Chart" && (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="y"

            dot
            label={widget.showLabel}
          />
        </LineChart>
      )}

      {/* ---------- AREA ---------- */}
      {chartType === "Area Chart" && (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Area dataKey="y" fill="#f07ec8ff">
            {widget.showLabel && (
              <LabelList dataKey="y" position="top" />
            )}
          </Area>
        </AreaChart>
      )}

      {/* ---------- SCATTER ---------- */}
      {chartType === "Scatter Chart" && (
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="x" fill="#362adbff" />
          <YAxis dataKey="y" fill="#179facff" />
          <Tooltip />
          <Scatter data={data}>
            {widget.showLabel && (
              <LabelList dataKey="y" position="top" />
            )}
          </Scatter>
        </ScatterChart>
      )}
    </ResponsiveContainer>
  );
}

//pie legend

const PieLegend = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <ul className="text-xs space-y-1">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-2">
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              display: "inline-block",
              borderRadius: 2,
            }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};


//pie chart


function PieChartWidget({ widget, orders }) {
  if (!widget?.dataKey) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Select chart data
      </div>
    );
  }

  /* ================= GROUP DATA ================= */
  const groupMap = {};

  orders.forEach((o) => {
    let groupKey = "Unknown";
    let value = 1;

    switch (widget.dataKey) {
      case "Product":
        groupKey = o.product || "Unknown";
        value = 1;
        break;

      case "Status":
        groupKey = o.status || "Unknown";
        value = 1;
        break;

      case "Created by":
        groupKey = o.createdBy || "Unknown";
        value = 1;
        break;

      case "Quantity":
        groupKey = o.product || "Item";
        value = o.quantity || 0;
        break;

      case "Unit price":
        groupKey = o.product || "Item";
        value = o.unitPrice || 0;
        break;

      case "Total amount":
        groupKey = o.product || "Item";
        value = (o.quantity || 0) * (o.unitPrice || 0);
        break;

      default:
        return;
    }

    groupMap[groupKey] = (groupMap[groupKey] || 0) + value;
  });

  /* ================= BUILD PIE DATA ================= */
  const data = Object.entries(groupMap).map(([key, val]) => ({
    name: key,     // ✅ REAL label (Status / Product / etc)
    value: val,
  }));


  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  /* ================= HSL COLOR DISTRIBUTION ================= */
  const colors = data.map((_, index) => {
    const hue = Math.round((360 / data.length) * index);
    return `hsl(${hue}, 65%, 55%)`;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>

        {widget.showLegend && (
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            content={<PieLegend />}
          />
        )}

      </PieChart>
    </ResponsiveContainer>
  );
}
