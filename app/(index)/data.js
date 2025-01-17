import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAudit } from "../context/auditContext";
import { useAuth } from "../context/authContext";

const Data = ({ navigation }) => {
  const { onGetAudits, onDeleteAudit } = useAudit();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const userId = authState.user.id;

  useEffect(() => {
    const fetchAudits = async () => {
      const result = await onGetAudits();
      if (result?.error) {
        console.error(result.msg);
      } else {
        setAudits(result);
      }
      setLoading(false);
    };

    fetchAudits();
  }, [onGetAudits]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    return date.toISOString().split("T")[0];
  };

  const handleEdit = (id) => {
    console.log(`Edit clicked for audit ID: ${id}`);
    navigation.navigate("EditAudit", { id });
  };

  const handleDelete = async (id) => {
    const result = await onDeleteAudit(id);
    if (result?.error) {
      console.error(result.msg);
    } else {
      setAudits(audits.filter((audit) => audit.id !== id));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.audit_title}</Text>
      <Text style={styles.cell}>{item.audit_area}</Text>
      <Text style={styles.cell}>{formatDate(item.audit_date)}</Text>
      <Text style={styles.cell}>{formatDate(item.close_date)}</Text>
      <Text style={styles.cell}>{item.auditor_name}</Text>
      <Text style={styles.cell}>{item.auditor_role}</Text>
      {item.auditor_id === userId && (
        <>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Header */}
            <View style={[styles.row, styles.header]}>
              <Text style={styles.headerCell}>Audit Title</Text>
              <Text style={styles.headerCell}>Audit Area</Text>
              <Text style={styles.headerCell}>TA Start</Text>
              <Text style={styles.headerCell}>TA Close</Text>
              <Text style={styles.headerCell}>Auditor Name</Text>
              <Text style={styles.headerCell}>Role</Text>
              <Text style={styles.headerCell}>Actions</Text>
            </View>
            {/* Body */}
            <FlatList
              data={audits}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flexGrow: 0,
  },
  header: {
    backgroundColor: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerCell: {
    width: 150,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  cell: {
    width: 150,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Data;
