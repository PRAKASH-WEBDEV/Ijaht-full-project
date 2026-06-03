import React from "react";
import StatusBadge from "../StatusBadge/StatusBadge";
import "./ManuscriptTable.css";
import { assetUrl } from "../../config/api";

export default function ManuscriptTable({ data, onApprove, onDelete, onReject }) {

  const handleReject = (id) => {

    const reason = prompt("Enter rejection reason for author:");

    if (!reason) return;

    onReject(id, reason);

  };

  return (

    <div className="table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>
            <th>Article Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>File</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (

            data.map((item) => (

              <tr key={item._id}>

                <td className="title-text">
                  {item.articleTitle}
                </td>

                <td>{item.authorName}</td>

                <td>
                  <StatusBadge status={item.status} />
                </td>

                <td>

                  <a
                    href={assetUrl(item.manuscriptFile?.path)}
                    target="_blank"
                    rel="noreferrer"
                    className="file-link"
                  >
                    📄 View PDF
                  </a>

                </td>

                <td className="action-btns">

                  {item.status !== "approved" && (

                    <button
                      className="btn-app"
                      onClick={() => onApprove(item._id)}
                    >
                      Approve
                    </button>

                  )}

                  <button
                    className="btn-rej"
                    onClick={() => handleReject(item._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn-del"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="5" className="no-data">
                No Manuscripts Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}
