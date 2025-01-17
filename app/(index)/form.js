import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useAudit } from "../context/auditContext";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

const Form = () => {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ audit: false, close: false });
  const { onCreateAudit } = useAudit();
  const { authState } = useAuth();

  const userId = authState.user.id;

  const toggleDatepicker = (field) => {
    setShowPicker((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onChange = (field, { type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker(field);

        if (field === "audit") {
          setStartDate(formatDate(currentDate));
        } else if (field === "close") {
          setCloseDate(formatDate(currentDate));
        }
      }
    } else {
      toggleDatepicker(field);
    }
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  const formatToDatabaseDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigation = useNavigation();

  const handleForm = async () => {
    if (!title || !area || !startDate || !closeDate) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const formattedStartDate = formatToDatabaseDate(startDate);
    const formattedCloseDate = formatToDatabaseDate(closeDate);

    try {
      const result = await onCreateAudit(
        title,
        area,
        formattedStartDate,
        formattedCloseDate,
        userId
      );
      console.log("create result:", result);

      if (result?.error) {
        Alert.alert("Error", result.msg || "Failed to register.");
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      setTitle("");
      setArea("");
      setStartDate("");
      setCloseDate("");
      navigation.navigate("Data", { refresh: true });
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Audit</Text>

      <Text style={styles.label}>Judul / Temuan Audit</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan temuan audit"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Area Audit</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={area}
          onValueChange={(itemValue) => setArea(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Area Audit" value="" />
          <Picker.Item label="Keuangan" value="Keuangan" />
          <Picker.Item label="Operasional" value="Operasional" />
          <Picker.Item label="IT" value="IT" />
          <Picker.Item label="Sumber Daya Manusia" value="SDM" />
        </Picker>
      </View>

      <Text style={styles.label}>Tanggal Audit</Text>
      <View style={styles.pickerDateContainer}>
        {showPicker.audit && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={(e, selectedDate) => onChange("audit", e, selectedDate)}
          />
        )}
        {!showPicker.audit && (
          <Pressable onPress={() => toggleDatepicker("audit")}>
            <TextInput
              style={styles.input}
              placeholder="Pilih Tanggal Audit"
              value={startDate}
              editable={false}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.pickerDateContainer}>
        <Text style={styles.label}>Tanggal Audit Close</Text>
        {showPicker.close && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={(e, selectedDate) => onChange("close", e, selectedDate)}
          />
        )}
        {!showPicker.close && (
          <Pressable onPress={() => toggleDatepicker("close")}>
            <TextInput
              style={styles.input}
              placeholder="Pilih Tanggal Audit Close"
              value={closeDate}
              editable={false}
            />
          </Pressable>
        )}
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleForm}>
        <Text style={styles.registerButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
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
  pickerContainer: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  pickerDateContainer: {
    width: "100%",
  },
  picker: {
    width: "100%",
    height: "100%",
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

export default Form;
