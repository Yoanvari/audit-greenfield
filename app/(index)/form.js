import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../(auth)/authContext";

const Form = () => {
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);

  // const toggleDatepicker = () => {
  //   setShowPicker(!showPicker);
  // };

  // const onChange = ({ type }, selectedDate) => {
  //   if (type == "set") {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);

  //     if (Platform.OS === "android") {
  //       toggleDatepicker();
  //       setDateOfBirth(formatDate(currentDate));
  //     }
  //   } else {
  //     toggleDatepicker();
  //   }
  // };

  // const formatDate = (rawDate) => {
  //   let date = new Date(rawDate);

  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();

  //   month = month < 10 ? `0${month}` : month;
  //   day = day < 10 ? `0${day}` : day;

  //   return `${day}-${month}-${year}`;
  // };

  // return (
  //   <View style={styles.container}>
  //     {showPicker && (
  //       <DateTimePicker
  //         mode="date"
  //         display="spinner"
  //         value={date}
  //         onChange={onChange}
  //       />
  //     )}

  //     <Text style={styles.label}>Tanggal Audit</Text>

  //     {!showPicker && (
  //       <Pressable onPress={toggleDatepicker}>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="Sat Aug 21 2025"
  //           value={dateOfBirth}
  //           onChangeText={setDateOfBirth}
  //           editable={false}
  //         />
  //       </Pressable>
  //     )}
  //   </View>
  // );
  const [auditTitle, setAuditTitle] = useState("");
  const [auditArea, setAuditArea] = useState("");
  const [auditDate, setAuditDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ audit: false, close: false });

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
          setAuditDate(formatDate(currentDate));
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Audit</Text>

      <Text style={styles.label}>Judul / Temuan Audit</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan temuan audit"
        value={auditTitle}
        onChangeText={setAuditTitle}
      />

      <Text style={styles.label}>Area Audit</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={auditArea}
          onValueChange={(itemValue) => setAuditArea(itemValue)}
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
            style={styles.inputDate}
            placeholder="Pilih Tanggal Audit"
            value={auditDate}
            editable={false}
          />
        </Pressable>
      )}

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
            style={styles.inputDate}
            placeholder="Pilih Tanggal TA Close"
            value={closeDate}
            editable={false}
          />
        </Pressable>
      )}

      <TouchableOpacity style={styles.registerButton}>
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
  // input: {
  //   width: "100%",
  //   height: 55,
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   borderRadius: 8,
  //   paddingHorizontal: 15,
  //   marginBottom: 15,
  //   fontSize: 16,
  //   color: "#333",
  //   backgroundColor: "#fff",
  // },
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
  inputDate: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
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
