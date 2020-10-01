import json

with open('GA_precincts16_simplified.json') as f:
    data = json.load(f)

districts = {
    '01': {
        "district_id": "01",
        "BVAP": 0,
        "VAP": 0,
        "BVAP%": 0,
        "precincts": []
    }
}

for feature in data['features']: # for each precinct
    # print(feature)
    # print(feature['properties'])
    precinct_info = feature['properties']
    district_id = feature['properties']['CD']  # the district that the precinct belongs to

    if district_id in districts:
        district = districts[district_id]
        district["BVAP"] += precinct_info["BVAP"]
        district["VAP"] += precinct_info["VAP"]
        precinct = {}
        precinct["ID"] = precinct_info["PRECINCT_I"]
        precinct["geometry"] = feature["geometry"] # 给precinct添加几何信息
        district["precincts"].append(precinct)
    else:
        precinct = {}
        precinct["precinct_id"] = precinct_info["PRECINCT_I"]
        precinct["geometry"] = feature["geometry"] # 给precinct添加几何信息
        districts[district_id] = {
            "district_id": district_id,
            "BVAP": precinct_info["BVAP"],
            "VAP": precinct_info["VAP"],
            "precincts": [precinct]
        }

for district in districts: # 算出每个district的黑人投票人口比例（BVAP%）
    districts[district]["BVAP%"] = districts[district]["BVAP"] / districts[district]["VAP"]

with open('GA_districts.json', 'w') as fp: # 把dictionary转为JSON
    json.dump(districts, fp)