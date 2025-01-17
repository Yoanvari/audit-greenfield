import { createContext, useContext } from "react";
import axios from "axios";
import { API_URL } from "./authContext";

const AuditContext = createContext({});

export const useAudit = () => {
  return useContext(AuditContext);
};

export const AuditProvider = ({ children }) => {
  const getAudits = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/audits`);
      console.log("Audits fetched:", response.data);
      return response.data;
    } catch (e) {
      console.error("Error fetching audits:", e.response?.data || e.message);
      return {
        error: true,
        msg: e.response?.data?.msg || "Failed to fetch audits",
      };
    }
  };

  const getAuditById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/audits/${id}`);
      console.log("Audit fetched by ID:", response.data);
      return response.data;
    } catch (e) {
      console.error(
        "Error fetching audit by ID:",
        e.response?.data || e.message
      );
      return {
        error: true,
        msg: e.response?.data?.msg || "Failed to fetch audit by ID",
      };
    }
  };

  const createAudit = async (
    audit_title,
    audit_area,
    audit_date,
    close_date,
    auditor_id
  ) => {
    try {
      const response = await axios.post(`${API_URL}/api/audits`, {
        audit_title,
        audit_area,
        audit_date,
        close_date,
        auditor_id,
      });
      console.log("Audit created:", response.data);
      return response.data;
    } catch (e) {
      console.error("Error logging audit:", e.response?.data || e.message);
      return {
        error: true,
        msg: e.response?.data?.msg || "Failed to log audit",
      };
    }
  };

  const updateAudit = async (
    id,
    audit_title,
    audit_area,
    audit_date,
    close_date,
    auditor_id
  ) => {
    try {
      const response = await axios.put(`${API_URL}/api/audits/${id}`, {
        audit_title,
        audit_area,
        audit_date,
        close_date,
        auditor_id,
      });
      console.log("Audit updated:", response.data);
      return response.data;
    } catch (e) {
      console.error("Error updating audit:", e.response?.data || e.message);
      return {
        error: true,
        msg: e.response?.data?.msg || "Failed to update audit",
      };
    }
  };

  const deleteAudit = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/audits/${id}`);
      console.log("Audit deleted:", response.data);
      return response.data;
    } catch (e) {
      console.error("Error deleting audit:", e.response?.data || e.message);
      return {
        error: true,
        msg: e.response?.data?.msg || "Failed to delete audit",
      };
    }
  };

  const value = {
    onCreateAudit: createAudit,
    onGetAuditById: getAuditById,
    onGetAudits: getAudits,
    onUpdateAudit: updateAudit,
    onDeleteAudit: deleteAudit,
  };

  return (
    <AuditContext.Provider value={value}>{children}</AuditContext.Provider>
  );
};

export default AuditProvider;
