

with open("streets.csv", encoding="utf-8", mode="r") as f:
    with open("streets.json", mode="w", encoding="utf-8") as target:
        target.write("[\n")
        id_counter = 1
        while True:
            line = f.readline()
            if not line:
                break
            elems = line.split(",")
            if len(elems) < 3:
                continue

            target.write("\t{\n\t\t\"street\": \"" + elems[0].strip("\"") + "\",\n\t\t\"type\": \"" + elems[1].strip("\"") + "\",\n\t\t\"english_name\": \"" + elems[2].strip("\"") + "\"\n\t},\n")
        target.write("]")
