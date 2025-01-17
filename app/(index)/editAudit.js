import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAudit } from "../context/auditContext";
import { useAuth } from "../context/authContext";
import { Picker } from "@react-native-picker/picker";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditAudit = ({ route, navigation }) => {
  const { id } = route.params;
  const { onGetAuditById, onUpdateAudit } = useAudit();
  const { authState } = useAuth();
  const [showPicker, setShowPicker] = useState({ audit: false, close: false });
  const userId = authState.user.id;

  const [auditData, setAuditData] = useState({
    title: "",
    area: "",
    startDate: "",
    closeDate: "",
  });

  useEffect(() => {
    const fetchAudit = async () => {
      const result = await onGetAuditById(id);
      if (result?.error) {
        Alert.alert("Error", result.msg);
      } else {
        setAuditData({
          title: result.audit_title,
          area: result.audit_area,
          startDate: formatDate(result.audit_date),
          closeDate: formatDate(result.close_date),
        });
      }
    };

    fetchAudit();
  }, [id]);

  const handleUpdateAudit = async () => {
    const { title, area, startDate, closeDate } = auditData;

    if (!title || !area || !startDate || !closeDate) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const result = await onUpdateAudit(
        id,
        title,
        area,
        startDate,
        closeDate,
        userId
      );
      if (result?.error) {
        Alert.alert("Error", result.msg);
      } else {
        Alert.alert("Success", "Audit updated successfully!");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Audit</Text>

      <Text style={styles.label}>Judul / Temuan Audit</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan temuan audit"
        value={auditData.title}
        onChangeText={(text) => setAuditData({ ...auditData, title: text })}
      />

      <Text style={styles.label}>Area Audit</Text>
      <Picker
        selectedValue={auditData.area}
        style={styles.input}
        onValueChange={(itemValue) =>
          setAuditData({ ...auditData, area: itemValue })
        }
      >
        <Picker.Item label="Pilih Area Audit" value="" />
        <Picker.Item label="Keuangan" value="Keuangan" />
        <Picker.Item label="Operasional" value="Operasional" />
        <Picker.Item label="Keamanan" value="Keamanan" />
        <Picker.Item label="Sumber Daya Manusia" value="SDM" />
        <Picker.Item label="Pemeliharaan" value="Pemeliharaan" />
        <Picker.Item label="Proyek" value="Proyek" />
        <Picker.Item label="Kepatuhan" value="Kepatuhan" />
        <Picker.Item label="Teknologi Informasi" value="TI" />
      </Picker>

      <Text style={styles.label}>Tanggal Audit</Text>
      <TextInput
        style={styles.input}
        placeholder="Pilih Tanggal Audit"
        value={auditData.startDate}
        onChangeText={(text) => setAuditData({ ...auditData, startDate: text })}
      />

      <Text style={styles.label}>Tanggal Audit Close</Text>
      <TextInput
        style={styles.input}
        placeholder="Pilih Tanggal Audit Close"
        value={auditData.closeDate}
        onChangeText={(text) => setAuditData({ ...auditData, closeDate: text })}
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleUpdateAudit}
      >
        <Text style={styles.registerButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditAudit;
