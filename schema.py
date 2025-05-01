def individual_data(subject):
    return{
        "first_name": str(subject["first_name"]),
        "last_name": str(subject["last_name"]),
        "dob": str(subject["dob"]),
        "image": str(subject["image"]),
    }

def individual_data_list(subjects):
    return [individual_data(subject) for subject in subjects]